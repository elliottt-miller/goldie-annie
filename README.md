# Goldie Ann’s Sweets & More

A standalone Vite + React storefront front end, built in `D:\AMD\projects\goldie-annie`. The responsive bakery landing page adapts the Sweet Morels template’s full-bleed wordmark hero, oversized editorial layout, image-led collection cards, moving sweets ticker, subtle reveal/hover motion, and large footer signature to Goldie Ann’s proposed brand direction. Collection cards and category filters browse a static sample menu; product detail dialogs hand visitors off to the existing Bakesy store. The project does not read or write live catalog, cart, checkout, payment, or order data.

Current rendered previews: [desktop](./preview-desktop.png) · [mobile](./preview-mobile.png).

## Run locally

```sh
npm install
npm run dev
```

Build a deployable static bundle with `npm run build`.

## GitHub Pages

The repository is configured for a project site at `https://<owner>.github.io/goldie-annie/`. The GitHub Actions workflow builds and deploys `main` on each push. It sets Vite’s `/goldie-annie/` base path in Actions; local development and builds keep `/`.

After creating the repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** if GitHub has not selected it automatically. The workflow deployment will publish the site.

## Content status

Product names and example prices were transcribed from publicly indexed Bakesy listings and need seller confirmation before launch. Food photographs are design placeholders and should be replaced with the bakery’s approved images. Brand visuals are a proposed direction because the live rendered logo/theme could not be retrieved during the audit. Motion respects reduced-motion preferences. See [AUDIT.md](./AUDIT.md) for the evidence, evaluation, priorities, and launch checklist, and [DESIGN_REFERENCES.md](./DESIGN_REFERENCES.md) for the local Framer reference review.
