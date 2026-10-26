/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_EMAILJS_SERVICE_ID?: string;
  readonly PUBLIC_EMAILJS_TEMPLATE_ID?: string;
  readonly PUBLIC_EMAILJS_PUBLIC_KEY?: string;
  readonly PUBLIC_N8N_REPORT_WEBHOOK?: string;
  readonly PUBLIC_GTM_CONTAINER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
