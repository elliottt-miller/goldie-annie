import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pageTitle, textReplacements } from "../site/goldie-branding.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
const site = path.join(root, "site");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of await readdir(site, { withFileTypes: true })) {
  if (entry.isDirectory() && entry.name === "subpages") continue;
  await cp(path.join(site, entry.name), path.join(output, entry.name), { recursive: true });
}
await cp(path.join(root, "public", "products"), path.join(output, "products"), { recursive: true });
await cp(path.join(root, "public", "goldie-ann-logo.svg"), path.join(output, "goldie-ann-logo.svg"));

const menuPhotoNames = [
  "funfetti-pops-transparent.png",
  "dipped-oreos-transparent.png",
  "lemon-blueberry-pops-transparent.png",
  "red-velvet-delight-transparent.png",
  "butterfinger-bliss-transparent.png",
  "homemade-caramel-pretzel-rods-transparent.png",
  "chocolate-dipped-pretzel-rods-transparent.png",
  "espresso-caramel-pops-transparent.png",
  "apple-pie-on-a-stick-transparent.png",
  "rice-krispy-treats-transparent.png",
  "mean-ones-sweet-box-transparent.png",
  "blue-christmas-confection-box-transparent.png",
];
const imageOverrides = [
  [/^gH5CZbZhiVGatm6vJCxELymTWGE/, "homepage-assortment.png"],
  [/^kBgzKXXLCzLWCvNo0DDMhegR28/, "homepage-scroll-assortment.png"],
  [/^pCEAxRztqSKweYEETxL5slXCXBQ/, "dipped-oreos-transparent.png"],
  [/^XJB63p2zrUpN7SbHUhBplRhW4e0/, "homemade-caramel-pretzel-rods-transparent.png"],
  [/^DySn2XY19oe1P4RYCdcRagOVnZo/, "apple-pie-on-a-stick-transparent.png"],
  [/^v3bBwzVA2zxWGukOt1H0JxWqpQ/, "rice-krispy-treats-transparent.png"],
  [/^G7MiGH7ZAgtPTdmV8SLLAiA2mw/, "butterfinger-bliss-transparent.png"],
  [/^b0D8D6SaIuBtdyquqcs0T7D3Dfs/, "lemon-blueberry-pops-transparent.png"],
  [/^j4WCQsqUzsHlSY9ZfderUjCqfag/, "espresso-caramel-pops-transparent.png"],
  [/^Y63R7EDfgP9pI41ETo1wdj0vI/, "butterfinger-bliss-transparent.png"],
  [/^3YHsQp4EM4pLJZBtXotfJreN618/, "lemon-blueberry-pops-transparent.png"],
  [/^28reBCva0Aw2VfkFrqzIBBrns/, "red-velvet-delight-transparent.png"],
  [/^Q4j0oVi5w412uOFkld8IVKgxR8/, "homepage-assortment.png"],
];
function pickGoldieImage(filename) {
  const named = imageOverrides.find(([pattern]) => pattern.test(filename));
  if (named) return named[1];
  const stem = filename.replace(/-[0-9a-f]{6}(?=\.)/i, "");
  const index = [...stem].reduce((sum, char) => sum + char.charCodeAt(0), 0) % menuPhotoNames.length;
  return menuPhotoNames[index];
}
async function rewriteTemplateImages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteTemplateImages(target);
      continue;
    }
    if (!/\.(?:html|css|js|mjs|json)$/i.test(entry.name)) continue;
    const source = await readFile(target, "utf8");
    const rewritten = source.replace(/((?:\.\.?\/)*assets\/images\/)([^?"'`\s)]+?\.(?:png|jpe?g|webp|avif|svg))(?:\?[^"'`\s)]*)?/gi, (_match, _prefix, filename) => {
      const destination = /^ICHCOjiffYyd6dVEBljz5mEQE\.svg$/i.test(filename)
        ? path.join(output, "goldie-ann-logo.svg")
        : path.join(output, "products", pickGoldieImage(filename));
      const relative = path.relative(path.dirname(target), destination).replaceAll("\\", "/");
      return relative.startsWith(".") ? relative : `./${relative}`;
    });
    if (rewritten !== source) await writeFile(target, rewritten);
  }
}
await rewriteTemplateImages(output);
async function rewriteTemplateBranding(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteTemplateBranding(target);
      continue;
    }
    if (!/\.(?:html|js|mjs)$/i.test(entry.name) || ["goldie-custom.js", "goldie-branding.js"].includes(entry.name)) continue;
    let source = await readFile(target, "utf8");
    for (const [from, to] of textReplacements) source = source.replaceAll(from, to);
    if (/^shared-lib\..+\.mjs$/i.test(entry.name)) {
      source = source.replace("title: `Goldie Ann’s`,", `title: \`${pageTitle}\`,`);
    }
    await writeFile(target, source);
  }
}
await rewriteTemplateBranding(output);
await rm(path.join(output, "assets", "images"), { recursive: true, force: true });

const indexPath = path.join(output, "index.html");
let html = await readFile(indexPath, "utf8");
const exportAssetMapper = "var target=new URL(assets[url.href],document.baseURI).href;";
const isFramerHomepage = html.includes(exportAssetMapper);
if (isFramerHomepage) html = html.replace(
  exportAssetMapper,
  'var assetBase=location.hostname.endsWith("github.io")&&location.pathname.indexOf("/goldie-annie")===0?location.origin+"/goldie-annie/":document.baseURI;var target=new URL(assets[url.href],assetBase).href;'
);
const exportImageMapper = "return Object.prototype.hasOwnProperty.call(assets,url.href)?assets[url.href]+hash:value;";
if (isFramerHomepage) html = html.replace(
  exportImageMapper,
  'var project=location.hostname.endsWith("github.io")&&location.pathname.indexOf("/goldie-annie")===0;var localPath=String(value).replace(/^(?:\\.\\.\\/|\\.\\/|\\/)+/,"");if(project&&/^(?:products\\/|goldie-ann-logo\\.svg)/.test(localPath))return location.origin+"/goldie-annie/"+localPath;if(!Object.prototype.hasOwnProperty.call(assets,url.href))return value;var mapped=assets[url.href]+hash;if(project&&/^(?:\\.\\/)?(?:products\\/|goldie-ann-logo\\.svg)/.test(mapped))mapped=location.origin+"/goldie-annie/"+mapped.replace(/^\\.\\//,"");return mapped;'
);
html = html
  .replace(/<html lang="en"[^>]*>/, '<html lang="en">')
  .replace(/<title>[^<]*<\/title>/, "<title>Goldie Ann’s Sweets &amp; More | Custom Decorated Treats</title>")
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Custom decorated cake pops, cakesicles, dipped Oreos, pretzels and Rice Krispy treats from Goldie Ann’s Sweets & More.">')
  .replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="Goldie Ann’s Sweets & More">')
  .replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="Custom decorated sweets, packages and treats from Goldie Ann’s.">')
  .replace(/<meta name="twitter:title" content="[^"]*">/, '<meta name="twitter:title" content="Goldie Ann’s Sweets & More">')
  .replace(/<meta name="twitter:description" content="[^"]*">/, '<meta name="twitter:description" content="Custom decorated sweets, packages and treats from Goldie Ann’s.">')
  .replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="https://elliottt-miller.github.io/goldie-annie/">')
  .replace(/<link href="[^"]+" rel="icon" media="\(prefers-color-scheme: light\)">/, '<link href="goldie-ann-logo.svg" rel="icon">')
  .replace(/<link href="[^"]+" rel="icon" media="\(prefers-color-scheme: dark\)">/, "")
  .replaceAll("../../assets/", "assets/");
if (isFramerHomepage) html = html
  .replace("</head>", '  <link rel="stylesheet" href="goldie-custom.css">\n  </head>')
  .replace("</body>", '  <script type="module" src="goldie-custom.js"></script>\n</body>');
await writeFile(indexPath, html);
await writeFile(path.join(output, "404.html"), html);
console.log(isFramerHomepage ? "Built the Framer storefront with Goldie Ann’s branding and assets." : "Built the Goldie Ann’s storefront homepage and menu assets.");
