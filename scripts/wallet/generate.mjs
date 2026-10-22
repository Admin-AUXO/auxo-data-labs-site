import { createSign } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { cardPage } from "../../src/data/card-links.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE = "https://auxodata.com";
const KEYDIR = join(homedir(), ".auxo");
const CONFIG = process.env.AUXO_WALLET_CONFIG || join(KEYDIR, "wallet.json");
const SA_KEY = process.env.AUXO_KEY || join(KEYDIR, "key.json");
const OUT_JSON = join(root, "src", "data", "wallet.json");
const OUT_DIR = join(root, "public", "wallet");

const expand = (p) => (p?.startsWith("~") ? join(homedir(), p.slice(1)) : p);
const config = existsSync(CONFIG) ? JSON.parse(readFileSync(CONFIG, "utf8")) : {};
const slug = (name) => name.toLowerCase().replace(/\s+/g, "-");
const cardUrl = (f) => `${SITE}/hello/#${f.id}`;

function details(f) {
  const email = f.contacts.find((c) => c.href.startsWith("mailto:"))?.href.slice(7);
  const wa = f.contacts.find((c) => c.href.includes("wa.me/"));
  const phone = wa ? `+${wa.href.split("wa.me/")[1].split("?")[0]}` : undefined;
  const linkedin = f.contacts.find((c) => c.href.includes("linkedin.com"))?.href;
  return { email, phone, phoneLabel: wa?.hint, linkedin };
}

const b64url = (input) => Buffer.from(input).toString("base64url");

function signJwt(payload, sa) {
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const body = b64url(JSON.stringify(payload));
  const signer = createSign("RSA-SHA256");
  signer.update(`${head}.${body}`);
  return `${head}.${body}.${signer.sign(sa.private_key, "base64url")}`;
}

const text = (value) => ({ defaultValue: { language: "en", value } });

function googleObject(f, issuerId) {
  const d = details(f);
  const modules = [
    { id: "note", header: "How I can help", body: f.note },
    d.email && { id: "email", header: "Email", body: d.email },
    d.phone && { id: "phone", header: "Phone", body: d.phoneLabel ?? d.phone },
  ].filter(Boolean);
  const links = [
    d.email && { id: "email", uri: `mailto:${d.email}`, description: `Email ${f.first}` },
    d.phone && { id: "phone", uri: `tel:${d.phone}`, description: `Call ${f.first}` },
    d.linkedin && { id: "linkedin", uri: d.linkedin, description: "LinkedIn" },
    { id: "card", uri: cardUrl(f), description: "Open digital card" },
  ].filter(Boolean);
  return {
    id: `${issuerId}.auxo-card-${f.id}`,
    classId: `${issuerId}.auxo-founder-card`,
    state: "ACTIVE",
    cardTitle: text(cardPage.company.name),
    header: text(f.name),
    subheader: text(f.role),
    hexBackgroundColor: "#0a0a0a",
    logo: { sourceUri: { uri: `${SITE}/icon-512.png` }, contentDescription: text("AUXO") },
    barcode: { type: "QR_CODE", value: cardUrl(f), alternateText: "auxodata.com/hello" },
    textModulesData: modules,
    linksModuleData: { uris: links },
  };
}

function google(issuerId) {
  if (!existsSync(SA_KEY)) throw new Error(`service account key not found at ${SA_KEY}`);
  const sa = JSON.parse(readFileSync(SA_KEY, "utf8"));
  const links = {};
  for (const f of cardPage.founders) {
    const jwt = signJwt(
      {
        iss: sa.client_email,
        aud: "google",
        typ: "savetowallet",
        origins: [SITE],
        payload: {
          genericClasses: [{ id: `${issuerId}.auxo-founder-card` }],
          genericObjects: [googleObject(f, issuerId)],
        },
      },
      sa,
    );
    links[f.id] = `https://pay.google.com/gp/v/save/${jwt}`;
  }
  return links;
}

async function appleImages() {
  const svg = readFileSync(join(root, "public", "favicon.svg"));
  const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();
  return {
    "icon.png": await png(29),
    "icon@2x.png": await png(58),
    "icon@3x.png": await png(87),
    "logo.png": await png(50),
    "logo@2x.png": await png(100),
    "logo@3x.png": await png(150),
  };
}

async function apple(cfg) {
  const { PKPass } = await import("passkit-generator");
  const certificates = {
    wwdr: readFileSync(expand(cfg.wwdr)),
    signerCert: readFileSync(expand(cfg.signerCert)),
    signerKey: readFileSync(expand(cfg.signerKey)),
    signerKeyPassphrase: cfg.signerKeyPassphrase || undefined,
  };
  const images = await appleImages();
  mkdirSync(OUT_DIR, { recursive: true });
  const files = {};
  for (const f of cardPage.founders) {
    const d = details(f);
    const pass = new PKPass({ ...images }, certificates, {
      formatVersion: 1,
      passTypeIdentifier: cfg.passTypeIdentifier,
      teamIdentifier: cfg.teamIdentifier,
      serialNumber: `auxo-card-${f.id}`,
      organizationName: cardPage.company.name,
      description: `${f.name}, ${cardPage.company.name}`,
      logoText: cardPage.company.name,
      backgroundColor: "rgb(10, 10, 10)",
      foregroundColor: "rgb(250, 250, 250)",
      labelColor: "rgb(163, 230, 53)",
    });
    pass.type = "generic";
    pass.primaryFields.push({ key: "name", label: f.role.toUpperCase(), value: f.name });
    pass.secondaryFields.push({ key: "note", label: "HOW I CAN HELP", value: f.note });
    if (d.email) pass.auxiliaryFields.push({ key: "email", label: "EMAIL", value: d.email });
    if (d.phone) pass.auxiliaryFields.push({ key: "phone", label: "PHONE", value: d.phoneLabel ?? d.phone });
    pass.backFields.push(
      ...[
        d.email && { key: "b-email", label: "Email", value: d.email },
        d.phone && { key: "b-phone", label: "Phone", value: d.phone },
        d.linkedin && { key: "b-linkedin", label: "LinkedIn", value: d.linkedin },
        { key: "b-card", label: "Digital card", value: cardUrl(f) },
        { key: "b-site", label: "Website", value: SITE },
      ].filter(Boolean),
    );
    pass.setBarcodes({ message: cardUrl(f), format: "PKBarcodeFormatQR", messageEncoding: "iso-8859-1" });
    const file = `${slug(f.name)}.pkpass`;
    writeFileSync(join(OUT_DIR, file), pass.getAsBuffer());
    files[f.id] = `/wallet/${file}`;
  }
  return files;
}

const out = Object.fromEntries(cardPage.founders.map((f) => [f.id, { google: null, apple: null }]));

if (config.google?.issuerId) {
  for (const [id, url] of Object.entries(google(config.google.issuerId))) out[id].google = url;
  console.log("google: signed save links for", Object.keys(out).join(", "));
} else {
  console.log("google: skipped (set google.issuerId in", CONFIG + ")");
}

if (config.apple?.passTypeIdentifier) {
  for (const [id, file] of Object.entries(await apple(config.apple))) out[id].apple = file;
  console.log("apple: wrote", Object.values(out).map((v) => v.apple).join(", "));
} else {
  console.log("apple: skipped (set apple.* in", CONFIG + ")");
}

writeFileSync(OUT_JSON, JSON.stringify(out, null, 2) + "\n");
console.log("wrote", OUT_JSON);
