import { defineConfig, type Plugin } from 'vite';
import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

// Shared chrome (rail, top bar, dock, footer) lives in partials/ and is stitched into each page at build time,
// so the output stays real static pages with no runtime templating.
const partials = (): Plugin => ({
  name: 'partials',
  transformIndexHtml: {
    order: 'pre',
    handler(html, ctx) {
      const page = basename(ctx.filename, '.html');
      const read = (n: string) => readFileSync(resolve(__dirname, 'partials', n), 'utf8');
      const nav = read('nav.html').replace(new RegExp(`data-page="${page}"`, 'g'), `data-page="${page}" aria-current="page"`);
      return html.replace('<!--@nav-->', nav).replace('<!--@foot-->', read('foot.html'));
    },
  },
});

export default defineConfig({
  base: './',
  plugins: [partials()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu.html'),
        reserve: resolve(__dirname, 'reserve.html'),
        visit: resolve(__dirname, 'visit.html'),
      },
    },
  },
});
