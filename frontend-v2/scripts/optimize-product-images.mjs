import { readdir, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const sourceDirectory = resolve('public/products');
const outputDirectory = resolve('out/products');
const entries = await readdir(sourceDirectory, { withFileTypes: true });
const productImages = entries.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.png'));

for (const image of productImages) {
  const source = join(sourceDirectory, image.name);
  const optimizedName = `${image.name.slice(0, -4)}.webp`;
  const output = join(outputDirectory, optimizedName);
  const shouldTrimTransparentEdges = image.name.toLowerCase().endsWith('-transparent.png');
  let input = source;

  if (shouldTrimTransparentEdges) {
    const trimmed = await sharp(source).trim().png().toBuffer({ resolveWithObject: true });
    const padding = Math.max(12, Math.round(Math.max(trimmed.info.width, trimmed.info.height) * 0.04));
    input = await sharp(trimmed.data)
      .extend({ top: padding, bottom: padding, left: padding, right: padding, background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  }

  await sharp(input)
    .webp({ quality: 86, alphaQuality: 92, effort: 5 })
    .toFile(output);

  await rm(join(outputDirectory, image.name), { force: true });
}

console.log(`Optimized ${productImages.length} product images for production; original PNGs remain in public/products.`);
