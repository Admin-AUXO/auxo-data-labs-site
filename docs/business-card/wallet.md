# Wallet passes for the business card (`/hello/`)

`npm run wallet` builds one pass per founder from `src/data/card-links.ts` and writes `src/data/wallet.json`. The card page shows an "Add to … Wallet" button only for passes listed there (Apple on iPhone, Google on Android, both on desktop). With no config, both are skipped and no buttons render.

Config lives outside the repo at `~/.auxo/wallet.json` (override with `AUXO_WALLET_CONFIG`). Re-run `npm run wallet` and commit the output whenever founder details change.

```json
{
  "google": { "issuerId": "3388000000000000000" },
  "apple": {
    "passTypeIdentifier": "pass.com.auxodata.card",
    "teamIdentifier": "ABCDE12345",
    "signerCert": "~/.auxo/apple/pass.pem",
    "signerKey": "~/.auxo/apple/pass.key",
    "signerKeyPassphrase": "",
    "wwdr": "~/.auxo/apple/wwdr.pem"
  }
}
```

## Google Wallet

1. Sign in to the Google Pay & Wallet Console (pay.google.com/business/console) as admin@auxodata.com and create a **Google Wallet API** issuer account. Copy the **Issuer ID**.
2. In Google Cloud project `auxodata`, enable the **Google Wallet API**.
3. In the Wallet Console, **Users → Invite** the service account `auxo-claude@…` (the one in `~/.auxo/key.json`) as Developer.
4. Put the Issuer ID in `~/.auxo/wallet.json`, run `npm run wallet`, commit `src/data/wallet.json`.
5. Until Google approves the issuer for publishing, saves only work for accounts added as **test users** in the console. Request publishing access in the console once tested.

The save link is a signed JWT ("skinny" links are not used): pass content is embedded, so no server or API call is needed at runtime.

## Apple Wallet

1. Apple Developer Program membership (organisation account for AUXO Data Labs).
2. Certificates, Identifiers & Profiles → **Identifiers → Pass Type IDs** → register `pass.com.auxodata.card`.
3. Create a **Pass Type ID certificate** for it, download, and export the certificate and private key as PEM (`pass.pem`, `pass.key`).
4. Download Apple's **WWDR G4** intermediate certificate and convert to PEM (`wwdr.pem`).
5. Fill the `apple` block (Team ID is on the membership page), run `npm run wallet`, commit `public/wallet/*.pkpass` and `src/data/wallet.json`.

Netlify serves `/wallet/*` as `application/vnd.apple.pkpass` so Safari opens the pass directly.

## Before switching buttons on publicly

Apple and Google both require their official "Add to Apple Wallet" / "Add to Google Wallet" badge artwork. Download the badges from each brand guideline page and swap them into `.card__wallet-btn` in `src/pages/hello.astro`.
