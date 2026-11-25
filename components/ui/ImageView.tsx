import NextImage, { type ImageProps } from "next/image";
import { preload as preloadImage } from "react-dom";
import type { ResolvedImage } from "@/lib/images/files";

const PASS_THROUGH = new Set(["className", "style", "id", "title", "role", "draggable", "onLoad", "onError", "onClick"]);

export type ImageViewProps = Omit<ImageProps, "src"> & {
  src: string;
  /** The image's pre-optimized files (lib/images resolveImage); without them `src` is served as it is. */
  image?: ResolvedImage | null;
};

/**
 * Renders an image from its pre-optimized files. Server components use the default
 * export of components/ui/Image.tsx, which resolves the files itself; a client
 * component receives `image` from its server parent and renders this.
 * - One file: next/image (unoptimized, next.config.ts), pointed at that file.
 * - Several widths: a plain <img> with srcset and sizes, so a phone fetches the small
 *   file; `preload` adds the same head preload next/image would, with the srcset.
 */
export function ImageView({ image, ...props }: ImageViewProps) {
  if (!image) return <NextImage {...props} />;
  if (!image.srcSet || props.fill) return <NextImage {...props} src={image.src} />;

  const { alt, width, height, sizes, preload, priority, loading, fetchPriority } = props;
  // HTML attributes pass through; next/image's own options (quality, placeholder...) mean nothing on a static file.
  const rest = Object.fromEntries(Object.entries(props).filter(([name]) => PASS_THROUGH.has(name) || /^(data|aria)-/.test(name)));
  const eager = Boolean(preload || priority);
  // Without sizes, the browser would assume the full viewport; the display width is the safer guess.
  const imageSizes = sizes ?? `${width}px`;
  if (eager) preloadImage(image.src, { as: "image", imageSrcSet: image.srcSet, imageSizes, fetchPriority: "high" });
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      alt={alt}
      src={image.src}
      srcSet={image.srcSet}
      sizes={imageSizes}
      width={width}
      height={height}
      loading={loading ?? (eager ? "eager" : "lazy")}
      fetchPriority={fetchPriority ?? (eager ? "high" : undefined)}
      decoding="async"
    />
  );
}
