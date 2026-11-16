# Sweet Morels template adaptation

The starting point is the complete local Sweet Morels Framer export. The source now lives in [`site/`](./site/), not in a nested template folder. Its responsive homepage composition, Framer runtime and animation behavior, type system, navigation, and section sequencing remain the structural reference. Goldie Ann’s identity and real catalog evidence drive the visible content and imagery.

## Template elements retained

- Oversized hero wordmark, full-bleed image composition, discovery action, and original animated layout.
- Framer scroll-driven introductions and featured sections, animated text reveals, moving brand ticker, navigation behavior, and responsive variants.
- Original template fonts, supporting assets, and animation/runtime code where they support the layout and interaction.
- Original logo and product imagery replaced by Goldie Ann’s supplied logo and generated transparent product cutouts. Build output removes the Sweet Morels food-image directory and maps its former image references to Goldie Ann’s product library.

## Goldie Ann’s content and shop

The seller description, six named cake-pop flavors, eight listings with screenshot-visible prices, holiday-box contents, pretzel options and add-ons, 50% deposit, and 6 PM–9 PM pickup guidance come from the owner-provided Bakesy screenshots. Items without evidenced prices or package sizes are not assigned invented values. The template’s irrelevant donut catalog is hidden. The local Shop navigation leads to `shop.html`; explicit Bakesy order actions remain external.

## Image treatment

Generated studio-style transparent cutouts are stored in [`public/products/`](./public/products/). The homepage uses a right-weighted, evergreen assortment so its transparent left side supports the template’s large hero lettering. Individual product cards use separate imagery where available, including a distinct caramel pretzel image and dipped pretzel image. These generated assets are visual representations and are not described as photographs of Goldie Ann’s own finished products.

## Build and deployment

`npm run build` creates the consolidated static GitHub Pages bundle in `dist/`. [`scripts/build-site.mjs`](./scripts/build-site.mjs) copies the single `site/` tree and product library, rewrites old template image references, and injects Goldie Ann’s branding. The static front end does not connect to a live catalog or process orders; ordering and current availability remain on Bakesy.
