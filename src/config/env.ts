export const env = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  ga4: {
    measurementId: import.meta.env.PUBLIC_GA4_MEASUREMENT_ID || "",
  },
} as const;
