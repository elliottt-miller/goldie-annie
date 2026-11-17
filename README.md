# Goldie Ann’s Sweets & More

The active production site is the TypeScript, React and Vite application in [`frontend-v2/`](./frontend-v2/). Its page structure and interaction design follow the supplied Cakelab React export, rebranded for Goldie Ann with the public logo badge, Goldie Ann product photography, and the gold, cream and plum brand palette.

## Develop and build

```powershell
cd frontend-v2
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

Vite writes the GitHub Pages artifact to `frontend-v2/out/`. The Pages workflow builds this directory with the `/goldie-annie/` base path. Orders and current availability link to Goldie Ann’s online shop; the Contact page does not claim to submit a server-side form.

See [`frontend-v2/README.md`](./frontend-v2/README.md) for the application structure and preview commands.
