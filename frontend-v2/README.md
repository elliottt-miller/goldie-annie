# Goldie Ann Sweets & More

Production React frontend based on the supplied Cakelab React export. The original section hierarchy, component layouts, typography, motion treatment and responsive breakpoints are retained and rebranded with Goldie Ann copy, product photography, the public logo badge, and the badge-matched gold, cream and burgundy palette.

## Local development

```powershell
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
```

The static production output is written to `out/`. The build creates optimized WebP delivery files from the product PNGs with Sharp, trims transparent padding from product cutouts (and adds a small transparent safety margin), then removes only the copied PNGs from `out/`; the original PNG assets in `public/products/` remain unchanged. The Vite development middleware applies the same image treatment so local previews match production. `vite.config.ts` creates a GitHub Pages `404.html` fallback for client-side routes.

## Source layout

- `src/pages/` defines the Home, About, Treats, Contact and not-found routes.
- `src/template/` contains the adapted Cakelab components, page compositions and CSS modules.
- `src/content/products.ts` is the Goldie Ann product catalogue used by the Treats page and interactive showcase.
- `src/assets/template-media/` holds the local template imagery and fonts referenced by the adapted components.
- `public/products/` holds the preserved Goldie Ann product PNGs; production delivery uses generated WebP files. `public/logo-badge.svg` is the sole served copy of the brand badge.

Orders and current availability link to Goldie Ann's online shop. The source export does not provide a server-side contact form or order processing, so the Contact route directs customers to that shop.
