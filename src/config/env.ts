/** Public runtime config. Secrets are not committed — emailjs values come
 *  from PUBLIC_EMAILJS_* env vars (the form degrades gracefully when unset). */
export const env = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  ga4: {
    measurementId: import.meta.env.PUBLIC_GA4_MEASUREMENT_ID || "G-WBMKHRWS7Z",
  },
  gtm: {
    containerId: import.meta.env.PUBLIC_GTM_ID || "GTM-N6547BGW",
  },
  emailjs: {
    serviceId: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || "",
    templateId: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID || "",
    publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || "",
  },
} as const;

export function emailjsConfigured(): boolean {
  return Boolean(env.emailjs.serviceId && env.emailjs.templateId && env.emailjs.publicKey);
}
