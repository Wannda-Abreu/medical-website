import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const target = process.env.VITE_API_PROXY_TARGET;

const sitemapPlugin = () => ({
  name: 'sitemap-generator',
  closeBundle() {
    try {
      const dist = path.resolve(process.cwd(), 'dist')
      if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true })
      const hostname = 'https://www.sanital.es'
      const urls = ['/', '/sobre-nosotros']
      const now = new Date().toISOString()
      const body = urls
        .map(
          (u) => `  <url>\n    <loc>${hostname}${u}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u === '/' ? '1.0' : '0.7'}</priority>\n  </url>`
        )
        .join('\n')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
      fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml)
      // also ensure robots.txt references sitemap when building without public/
      const robotsPath = path.join(process.cwd(), 'public', 'robots.txt')
      if (!fs.existsSync(robotsPath)) {
        fs.writeFileSync(
          path.join(dist, 'robots.txt'),
          `User-agent: *\nAllow: /\nSitemap: ${hostname}/sitemap.xml\n`
        )
      }
      // eslint-disable-next-line no-console
      console.log('[sitemap] generated sitemap.xml')
    } catch (e) {
      console.warn('[sitemap] skipped:', e?.message)
    }
  },
})

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
  base: './',
  server: {
    proxy: target
      ? {
          '/api': {
            target,
            changeOrigin: true,
          },
        }
      : undefined,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  }
})
