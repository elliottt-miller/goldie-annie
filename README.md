# Goldie Ann’s Sweets & More

A mobile-first static storefront built from the Sweet Morels Framer export and rebranded for Goldie Ann’s. The Framer homepage structure, responsive variants, and motion remain the foundation. Goldie Ann’s logo, copy, evidence-based product catalog, product imagery, custom interactions, and standalone shop are part of the same deployed site.

## Project layout

- `site/` — single source tree for the homepage, shop, styles, scripts, fonts, and Framer runtime.
- `public/products/` — product image library and generated transparent cutouts used by the storefront.
- `public/goldie-ann-logo.svg` — supplied brand logo.
- `scripts/` — static build and local preview server.
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment workflow.

There are no separate `frontend/` or `template/` source trees. The build assembles the active storefront from `site/` into `dist/`, copies the product library and logo, rewrites former template food-image references to Goldie Ann’s imagery, and excludes legacy unbranded subpages and the old template food-image directory from the published bundle.

## Run locally

```sh
npm ci
npm run build
npm run dev
```

Open `http://127.0.0.1:4173/`. The Shop navigation opens the local `shop.html` catalog. The explicit “Order on Bakesy” actions link to Goldie Ann’s existing Bakesy storefront.

## Catalog and imagery

Names, visible prices, listed quantities, options, presale details, and order policies are transcribed from the owner-provided screenshots of Goldie Ann’s shop. Details not visible in that evidence are not guessed; current availability is not claimed. Bakesy remains the handoff for current options and orders. No live inventory API, cart, checkout, payment, or order workflow is implemented.

Product imagery in `public/products/` includes generated studio-style transparent cutouts customized for the documented Goldie Ann’s treats. Generated imagery is presentation art, not a claim that the images are photographs of the seller’s actual batches. The original supplied logo is used for brand identity.

See [`AUDIT.md`](./AUDIT.md) for the source evidence and audit limits, and [`DESIGN_REFERENCES.md`](./DESIGN_REFERENCES.md) for how the template is adapted.
