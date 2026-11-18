import type { ImgHTMLAttributes } from "react";
import { responsiveProductSrcSet } from "./productImage";

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  src: string;
  sizes?: string;
}

/** Uses the size variants produced by scripts/optimize-product-images.mjs. */
export default function ResponsiveProductImage({ src, sizes = "100vw", ...imageProps }: Props) {
  return <img {...imageProps} src={src} srcSet={responsiveProductSrcSet(src)} sizes={sizes} />;
}
