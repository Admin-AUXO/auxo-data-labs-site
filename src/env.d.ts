/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GTM_CONTAINER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
