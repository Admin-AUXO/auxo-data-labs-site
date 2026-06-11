import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import pagefind from 'astro-pagefind';
import vercel from '@astrojs/vercel';
import { unified } from '@astrojs/markdown-remark';
import { fileURLToPath } from 'node:url';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';

const srcDir = fileURLToPath(new URL('./src', import.meta.url));

const isPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: isPages ? 'https://admin-auxo.github.io' : 'https://auxodata.com',
  base: isPages ? '/auxo-data-labs-site' : undefined,
  output: 'static',
  ...(isPages ? {} : { adapter: vercel({ webAnalytics: { enabled: false } }) }),
  devToolbar: { enabled: false },
  redirects: {
    '/self-check/': '/services/',
    '/diagnostic/': '/services/',
    '/trust/': '/about/',
    '/blog/': '/',
    '/services/compliance-intelligence/': '/services/',
    '/services/data-spine/': '/services/',
    '/services/portfolio-command/': '/services/',
    '/services/applied-ai/': '/services/',
    '/services/forecast-engine/': '/services/',
    '/services/ops-autopilot/': '/services/',
    '/services/agent-studio/': '/services/',
  },
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
        'simple-icons': ['x'],
        mdi: [
          'account-sync-outline',
          'arrow-left',
          'arrow-right',
          'arrow-up',
          'calendar-clock-outline',
          'calendar-outline',
          'chart-box-outline',
          'check-decagram',
          'clock-check-outline',
          'close',
          'cog-sync',
          'cookie',
          'cube-outline',
          'database-check-outline',
          'email-outline',
          'file-document',
          'file-document-outline',
          'handshake',
          'linkedin',
          'magnify',
          'magnify-scan',
          'map-marker-outline',
          'motion-play-outline',
          'send',
          'shield-check-outline',
        ],
      },
    }),
    mdx(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
    pagefind(),
  ],
});
