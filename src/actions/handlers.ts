import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";

const consent = z.boolean().refine((v) => v === true, {
  message: "Consent is required before we can contact you.",
});

const email = z.string().trim().email("Enter a valid email address.");

const honeypot = z.string().trim().max(200).optional();

function webhookUrl(name: string): string | undefined {
  return (import.meta.env as Record<string, string | undefined>)[name];
}

function isHoneypotTripped(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

async function deliver(name: string, payload: Record<string, unknown>): Promise<boolean> {
  const url = webhookUrl(name);

  if (!url) {
    if (import.meta.env.PROD) {
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "This form is not connected yet. Please email us directly.",
      });
    }
    return false;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "We could not submit your details just now. Please try again or email us directly.",
    });
  }

  if (!response.ok) {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "We could not submit your details just now. Please try again or email us directly.",
    });
  }

  return true;
}

function guard(
  company_url: string | undefined,
  context: { clientAddress?: string },
): boolean {
  if (isHoneypotTripped(company_url)) return true;
  rateLimit(context.clientAddress);
  return false;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_PRUNE_AT = 5_000;

const rateLimitHits = new Map<string, number[]>();

function rateLimit(clientAddress: string | undefined): void {
  if (!clientAddress) return;

  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const recent = (rateLimitHits.get(clientAddress) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  rateLimitHits.set(clientAddress, recent);

  if (rateLimitHits.size > RATE_LIMIT_PRUNE_AT) {
    for (const [key, times] of rateLimitHits) {
      const live = times.filter((t) => t > windowStart);
      if (live.length === 0) rateLimitHits.delete(key);
      else rateLimitHits.set(key, live);
    }
  }

  if (recent.length > RATE_LIMIT_MAX) {
    throw new ActionError({
      code: "TOO_MANY_REQUESTS",
      message: "Too many submissions in a short time. Please wait a moment and try again.",
    });
  }
}

export const realServer = {
  subscribeBrief: defineAction({
    input: z.object({ email, consent, company_url: honeypot }),
    handler: async ({ email, company_url }, context) => {
      if (guard(company_url, context)) {
        return { ok: true as const, pending: true as const };
      }

      const delivered = await deliver("BRIEF_WEBHOOK_URL", { email });
      if (!delivered) {
        return { ok: true as const, pending: true as const };
      }

      return { ok: true as const, pending: false as const };
    },
  }),

  requestReport: defineAction({
    input: z.object({
      email,
      consent,
      band: z.string().trim().max(64).optional(),
      company_url: honeypot,
    }),
    handler: async ({ email, band, company_url }, context) => {
      if (guard(company_url, context)) {
        return { ok: true as const, pending: true as const };
      }

      const delivered = await deliver("REPORT_WEBHOOK_URL", { email, band });
      if (!delivered) {
        return { ok: true as const, pending: true as const };
      }

      return { ok: true as const, pending: false as const };
    },
  }),

  contactEnquiry: defineAction({
    input: z.object({
      name: z.string().trim().min(2, "Tell us your name.").max(100),
      email,
      company: z.string().trim().max(120).optional(),
      topic: z.string().trim().max(120).optional(),
      message: z
        .string()
        .trim()
        .min(20, "A sentence or two about the problem helps us route it.")
        .max(2000),
      consent,
      company_url: honeypot,
    }),
    handler: async ({ name, email, company, topic, message, company_url }, context) => {
      if (guard(company_url, context)) {
        return { ok: true as const };
      }

      await deliver("CONTACT_WEBHOOK_URL", { name, email, company, topic, message });

      return { ok: true as const };
    },
  }),
};
