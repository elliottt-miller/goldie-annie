import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const sourceDirectory = resolve('public/products');
const outputDirectory = resolve('out/products');
const publicOnly = process.argv.includes('--public-only');
const responsiveWidths = [320, 640, 960, 1280];
const entries = await readdir(sourceDirectory, { withFileTypes: true });
const files = new Set(entries.filter((entry) => entry.isFile()).map((entry) => entry.name));
const sourceWebps = entries.filter((entry) => entry.isFile()
  && entry.name.toLowerCase().endsWith('.webp')
  && !/-\d{3,4}\.webp$/i.test(entry.name));
const pngFallbacks = entries.filter((entry) => entry.isFile()
  && entry.name.toLowerCase().endsWith('.png')
  && !files.has(`${entry.name.slice(0, -4)}.webp`));

await mkdir(sourceDirectory, { recursive: true });
if (!publicOnly) await mkdir(outputDirectory, { recursive: true });

for (const image of sourceWebps) {
  const source = join(sourceDirectory, image.name);
  const stem = image.name.slice(0, -5);
  const sourceBuffer = await readFile(source);

  for (const width of responsiveWidths) {
    const variantName = `${stem}-${width}.webp`;
    const variantBuffer = await sharp(sourceBuffer)
      .resize({ width, withoutEnlargement: false })
      .webp({ quality: 84, alphaQuality: 92, effort: 5 })
      .toBuffer();
    await writeFile(join(sourceDirectory, variantName), variantBuffer);
    if (!publicOnly) await writeFile(join(outputDirectory, variantName), variantBuffer);
  }

  if (!publicOnly) await writeFile(join(outputDirectory, image.name), sourceBuffer);
}

for (const image of pngFallbacks) {
  const source = join(sourceDirectory, image.name);
  const stem = image.name.slice(0, -4);
  const publicOutput = join(sourceDirectory, `${stem}.webp`);
  const trimmed = stem.toLowerCase().endsWith('-transparent')
    ? await sharp(source).trim().png().toBuffer({ resolveWithObject: true })
    : undefined;
  const padding = trimmed ? Math.max(12, Math.round(Math.max(trimmed.info.width, trimmed.info.height) * 0.04)) : 0;
  const sourceBuffer = trimmed
    ? await sharp(trimmed.data)
      .extend({ top: padding, bottom: padding, left: padding, right: padding, background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()
    : await readFile(source);
  const webpBuffer = await sharp(sourceBuffer)
    .webp({ quality: 86, alphaQuality: 92, effort: 5 })
    .toBuffer();
  await writeFile(publicOutput, webpBuffer);

  for (const width of responsiveWidths) {
    const variantName = `${stem}-${width}.webp`;
    const variantBuffer = await sharp(sourceBuffer)
      .resize({ width, withoutEnlargement: false })
      .webp({ quality: 84, alphaQuality: 92, effort: 5 })
      .toBuffer();
    await writeFile(join(sourceDirectory, variantName), variantBuffer);
    if (!publicOnly) await writeFile(join(outputDirectory, variantName), variantBuffer);
  }

  if (!publicOnly) await writeFile(join(outputDirectory, `${stem}.webp`), webpBuffer);
}

if (!publicOnly) {
  const outputEntries = await readdir(outputDirectory, { withFileTypes: true });
  const canonicalFiles = new Set([
    ...sourceWebps.map((image) => image.name),
    ...sourceWebps.flatMap((image) => responsiveWidths.map((width) => `${image.name.slice(0, -5)}-${width}.webp`)),
    ...pngFallbacks.flatMap((image) => {
      const stem = image.name.slice(0, -4);
      return [`${stem}.webp`, ...responsiveWidths.map((width) => `${stem}-${width}.webp`)];
    }),
  ]);
  await Promise.all(outputEntries
    .filter((entry) => entry.isFile() && !canonicalFiles.has(entry.name))
    .map((entry) => rm(join(outputDirectory, entry.name), { force: true })));
}

console.log(publicOnly
  ? `Prepared WebP product images and responsive variants in public/products.`
  : `Copied canonical WebP product images and rebuilt responsive variants in out/products.`);
