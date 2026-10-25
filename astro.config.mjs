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
    '/the-work': '/how-it-works/',
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
          'claude',
          'dbt',
          'googlebigquery',
          'googlecloud',
          'hubspot',
          'microsoftazure',
          'n8n',
          'openai',
          'powerbi',
          'salesforce',
          'snowflake',
          'x',
        ],
        mdi: [
          'account-check-outline',
          'account-plus-outline',
          'account-search-outline',
          'apple',
          'arrow-left',
          'arrow-right',
          'arrow-up',
          'brain',
          'bullhorn-outline',
          'calculator-variant-outline',
          'calendar-clock-outline',
          'calendar-outline',
          'cash-multiple',
          'check',
          'check-circle-outline',
          'check-decagram',
          'chip',
          'clock-check-outline',
          'close',
          'cog-outline',
          'cookie',
          'domain',
          'email-outline',
          'file-document',
          'file-document-outline',
          'filter-variant',
          'hammer-wrench',
          'handshake-outline',
          'information-outline',
          'layers-outline',
          'lightbulb-outline',
          'linkedin',
          'magnify',
          'map-marker-outline',
          'motion-play-outline',
          'newspaper-variant-outline',
          'office-building-outline',
          'open-in-new',
          'plus',
          'puzzle-outline',
          'robot-outline',
          'rocket-launch-outline',
          'send',
          'shield-check-outline',
          'sync',
          'view-grid-outline',
          'wallet-outline',
          'whatsapp',
        ],
      },
    }),
    mdx(),
    pagefind(),
  ],
});
