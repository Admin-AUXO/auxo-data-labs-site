export const env = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  gtm: {
    containerId: import.meta.env.PUBLIC_GTM_CONTAINER_ID || "GTM-N6547BGW",
  },
} as const;
