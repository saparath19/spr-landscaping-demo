import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ site: process.env.SITE_URL || 'https://example.com', output: 'static', vite: { plugins: [tailwindcss()] } });
