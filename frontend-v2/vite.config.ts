import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const developmentProductImages = new Map<string, Promise<Buffer>>();

const developmentProductImageMiddleware = {
  name: 'development-product-image-webp',
  configureServer(server: import('vite').ViteDevServer) {
    server.middlewares.use(async (request, response, next) => {
      const pathname = request.url?.split('?')[0];
      const match = pathname?.match(/^\/products\/([a-z0-9-]+)\.webp$/i);
      if (!match) {
        next();
        return;
      }

      const filename = match[1].toLowerCase();
      // Let Vite serve assets that are already WebP (for example cakesicles)
      // instead of trying to load a nonexistent same-name PNG source.
      try {
        await access(resolve('public/products', `${filename}.webp`));
        next();
        return;
      } catch {
        // No pre-optimized file exists; fall through to the PNG transform.
      }

      try {
        let image = developmentProductImages.get(filename);
        if (!image) {
          image = readFile(resolve('public/products', `${filename}.png`)).then(async (source) => {
            const shouldTrimTransparentEdges = filename.endsWith('-transparent');
            let input: Buffer = source;

            if (shouldTrimTransparentEdges) {
              const trimmed = await sharp(source).trim().png().toBuffer({ resolveWithObject: true });
              const padding = Math.max(12, Math.round(Math.max(trimmed.info.width, trimmed.info.height) * 0.04));
              input = await sharp(trimmed.data)
                .extend({ top: padding, bottom: padding, left: padding, right: padding, background: { r: 0, g: 0, b: 0, alpha: 0 } })
                .png()
                .toBuffer();
            }

            return sharp(input).webp({ quality: 86, alphaQuality: 92, effort: 5 }).toBuffer();
          });
          developmentProductImages.set(filename, image);
        }

        const webp = await image;
        response.statusCode = 200;
        response.setHeader('Content-Type', 'image/webp');
        response.setHeader('Cache-Control', 'no-cache');
        response.setHeader('Content-Length', webp.byteLength);
        response.end(webp);
      } catch (error) {
        developmentProductImages.delete(filename);
        next(error instanceof Error ? error : new Error('Could not optimize this product image.'));
      }
    });
  },
};

const pagesSpaFallback = {
  name: 'github-pages-spa-fallback',
  closeBundle() {
    copyFileSync(resolve('out/index.html'), resolve('out/404.html'));
  },
};

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/goldie-annie/' : '/',
  plugins: [react(), developmentProductImageMiddleware, pagesSpaFallback],
  build: { target: 'es2022', sourcemap: false, cssCodeSplit: true, outDir: 'out' },
});
