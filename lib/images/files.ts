/**
 * The pre-optimized files of one image, and how to choose among them. Pure, so it can
 * be tested without the manifests (lib/images/index.ts reads those).
 */

export interface ImageFile {
  src: string;
  width: number;
  height: number;
}

/** An image ready to render: its full-size file and, when it has several widths, a srcset. */
export interface ResolvedImage extends ImageFile {
  /** Every file, narrowest first; the last is the full-size one. */
  files: ImageFile[];
  /** `src 640w, src 1280w, ...` when there is more than one file. */
  srcSet?: string;
}

/** A URL as one srcset candidate: the spaces and commas that would split it are escaped (media URLs arrive already percent-encoded). */
const candidate = (src: string) => src.replace(/ /g, "%20").replace(/,/g, "%2C");

export function resolved(full: ImageFile, smaller: ImageFile[]): ResolvedImage {
  const files = [...smaller.filter((file) => file.width < full.width), full].sort((a, b) => a.width - b.width);
  return {
    ...full,
    files,
    srcSet: files.length > 1 ? files.map((file) => `${candidate(file.src)} ${file.width}w`).join(", ") : undefined,
  };
}

/** The narrowest file at least `width` pixels wide, or the widest there is. */
export function fileFor(image: ResolvedImage, width: number): ImageFile {
  return image.files.find((file) => file.width >= width) ?? image.files[image.files.length - 1];
}
