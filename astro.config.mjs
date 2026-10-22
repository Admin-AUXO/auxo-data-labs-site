import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import pagefind from 'astro-pagefind';
import { unified } from '@astrojs/markdown-remark';
import { fileURLToPath } from 'node:url';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';

const srcDir = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  site: 'https://auxodata.com',
  output: 'static',
  redirects: {
    '/self-check': '/auxo-score/',
    '/v': '/hello/',
  },
  devToolbar: { enabled: false },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  markdown: {
    processor: unified({ remarkPlugins: [remarkReadingTime] }),
  },
  vite: {
    build: {
      target: 'esnext',
    },
    esbuild: {
      legalComments: 'none',
    },
    logLevel: 'warn',
    resolve: { alias: { '@': srcDir } },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(offline|404|hello)\/?$/.test(page),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
        },
      },
    }),
    icon({
      include: {
        'simple-icons': [
          'anthropic',
          'googlecloud',
          'microsoftazure',
          'oracle',
          'powerbi',
          'salesforce',
          'sap',
          'snowflake',
          'tableau',
          'x',
        ],
        mdi: [
          'account-plus-outline',
          'apple',
          'arrow-left',
          'arrow-right',
          'arrow-up',
          'calendar-clock-outline',
          'calendar-outline',
          'check-decagram',
          'clock-check-outline',
          'close',
          'cookie',
          'email-outline',
          'file-document',
          'file-document-outline',
          'gauge',
          'linkedin',
          'magnify',
          'map-marker-outline',
          'motion-play-outline',
          'send',
          'share-variant-outline',
          'shield-check-outline',
          'wallet-outline',
          'web',
          'whatsapp',
        ],
      },
    }),
    mdx(),
    pagefind(),
  ],
});
