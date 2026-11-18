import { access, copyFile, mkdir, readFile, readdir, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const sourceDirectory = resolve('public/products');
const outputDirectory = resolve('out/products');
const publicOnly = process.argv.includes('--public-only');
const entries = await readdir(sourceDirectory, { withFileTypes: true });
const pngImages = entries.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.png'));
const pngStems = new Set(pngImages.map((image) => image.name.slice(0, -4).toLowerCase()));
const standaloneWebpImages = entries.filter((entry) => entry.isFile()
  && entry.name.toLowerCase().endsWith('.webp')
  && !/-\d{3,4}\.webp$/i.test(entry.name)
  && !pngStems.has(entry.name.slice(0, -5).toLowerCase()));
const imageSources = [
  ...pngImages.map((image) => ({ image, extension: '.png' })),
  ...standaloneWebpImages.map((image) => ({ image, extension: '.webp' })),
];
const responsiveWidths = [320, 640, 960, 1280];

await mkdir(sourceDirectory, { recursive: true });
if (!publicOnly) await mkdir(outputDirectory, { recursive: true });

for (const { image, extension } of imageSources) {
  const source = join(sourceDirectory, image.name);
  const stem = image.name.slice(0, -extension.length);
  const optimizedName = `${stem}.webp`;
  const publicOutput = join(sourceDirectory, optimizedName);
  const output = join(outputDirectory, optimizedName);
  const shouldTrimTransparentEdges = extension === '.png' && stem.toLowerCase().endsWith('-transparent');
  let input = extension === '.png' ? source : await readFile(source);

  if (shouldTrimTransparentEdges) {
    const trimmed = await sharp(source).trim().png().toBuffer({ resolveWithObject: true });
    const padding = Math.max(12, Math.round(Math.max(trimmed.info.width, trimmed.info.height) * 0.04));
    input = await sharp(trimmed.data)
      .extend({ top: padding, bottom: padding, left: padding, right: padding, background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  }

  if (extension === '.png') {
    try {
      await access(publicOutput);
    } catch {
      await sharp(input).webp({ quality: 86, alphaQuality: 92, effort: 5 }).toFile(publicOutput);
    }
  }

  for (const width of responsiveWidths) {
    const variantName = `${stem}-${width}.webp`;
    const publicVariant = join(sourceDirectory, variantName);
    try {
      await access(publicVariant);
    } catch {
      await sharp(input)
        .resize({ width, withoutEnlargement: false })
        .webp({ quality: 84, alphaQuality: 92, effort: 5 })
        .toFile(publicVariant);
    }

    if (!publicOnly) {
      const outputVariant = join(outputDirectory, variantName);
      try {
        await access(outputVariant);
      } catch {
        await copyFile(publicVariant, outputVariant);
      }
    }
  }

  if (publicOnly) continue;

  if (extension === '.png') {
    try {
      await access(output);
    } catch {
      await sharp(input).webp({ quality: 86, alphaQuality: 92, effort: 5 }).toFile(output);
    }
  }

  if (extension === '.png') await rm(join(outputDirectory, image.name), { force: true });
}

console.log(publicOnly
  ? `Prepared WebP and responsive product image assets for development; original files remain in public/products.`
  : `Optimized ${imageSources.length} product images and responsive variants for production; original PNGs remain in public/products.`);
