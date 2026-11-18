const RESPONSIVE_IMAGE_WIDTHS = [320, 640, 960, 1280] as const;

/** Build a responsive source set for WebP files emitted by the image pipeline. */
export function responsiveProductSrcSet(src: string): string | undefined {
  if (!src.includes('/products/') || !src.endsWith('.webp')) return undefined;

  const stem = src.slice(0, -'.webp'.length);
  return RESPONSIVE_IMAGE_WIDTHS.map((width) => `${stem}-${width}.webp ${width}w`).join(', ');
}
