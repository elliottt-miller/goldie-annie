# Goldie Ann’s Sweets & More

A responsive, mobile-first React/Vite storefront in `D:\AMD\projects\goldie-annie`. It adapts the local Sweet Morels template’s image-led editorial layout, collection browsing, moving sweets ticker, and restrained motion to Goldie Ann’s navy-and-gold brand cues. The site is a static front end: product links hand off to the existing Bakesy shop. There is no live product API, cart, checkout, payment, or order workflow.

## Local development

```sh
npm install
npm run dev
```

Create a deployable bundle with `npm run build`.

## Catalog and image evidence

The visible item names, prices, quantities, holiday box details, add-on options, and ordering policies were transcribed from the owner-supplied Bakesy screenshots. Details absent from those screenshots are left for Bakesy confirmation; see [AUDIT.md](./AUDIT.md) for the evidence record and limits. The initial unrelated bakery catalog was removed.

Product photos in `public/products/` are AI-restyled studio images based on the supplied product references, with an illustrative generated image for cakesicles because no cakesicle reference photo was supplied. They improve the draft storefront presentation but cannot guarantee the exact decoration or future product appearance. Replace them with owner-approved photos when available.

## GitHub Pages

The Pages build uses the `/goldie-annie/` Vite base path in GitHub Actions and deploys the `main` branch via `.github/workflows/deploy-pages.yml`. Live catalog and ordering remain at [Goldie Ann’s Bakesy shop](https://shop.bakesy.app/b/goldie-anns-sweets-more).

See [DESIGN_REFERENCES.md](./DESIGN_REFERENCES.md) for the local Framer/template review.
