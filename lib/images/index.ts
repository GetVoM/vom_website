import localManifest from "./manifest.json";
import mediaManifest from "./media-manifest.json";
import { fileFor, resolved, type ImageFile, type ResolvedImage } from "./files";

export type { ImageFile, ResolvedImage } from "./files";

/**
 * Every image is served as a static file: Vercel's image optimizer is off
 * (next.config.ts images.unoptimized). Two manifests say which files exist:
 * - manifest.json: the images in public/, pre-optimized into /images/optimized/ by
 *   scripts/optimize-images.mjs (`pnpm optimize:images`);
 * - media-manifest.json: the blog's images on the media domain, with the smaller
 *   copies and the share image scripts/optimize-media.mjs uploaded beside them.
 * An image in neither (an SVG, a file not yet optimized) is served as it is.
 * Server code only: the manifests stay out of the browser's JavaScript. A client
 * component receives a ResolvedImage from its server parent.
 */

/** The media domain (Cloudflare R2) that holds the blog's images. */
export const MEDIA_URL = (process.env.MEDIA_BASE_URL || "https://media.getvom.com").replace(/\/$/, "");

interface LocalEntry extends ImageFile {
  variants: ImageFile[];
}
interface MediaEntry {
  width: number;
  height: number;
  /** Smaller copies, as keys on the media domain. */
  variants: { key: string; width: number; height: number }[];
  /** A JPEG share image, for posts whose cover this is. */
  og?: { key: string; width: number; height: number };
}

const local = localManifest as Record<string, LocalEntry>;
const media = mediaManifest as Record<string, MediaEntry>;

const mediaKey = (src: string) => (src.startsWith(`${MEDIA_URL}/`) ? src.slice(MEDIA_URL.length + 1) : null);
const mediaFile = (key: string, width: number, height: number): ImageFile => ({ src: `${MEDIA_URL}/${key}`, width, height });

/** The optimized files of an image (a public/ path or a media-domain URL), or null when it has none. */
export function resolveImage(src: string): ResolvedImage | null {
  const entry = local[src];
  if (entry) return resolved(entry, entry.variants);
  const key = mediaKey(src);
  const item = key ? media[key] : undefined;
  if (key && item) {
    return resolved(
      mediaFile(key, item.width, item.height),
      item.variants.map((v) => mediaFile(v.key, v.width, v.height)),
    );
  }
  return null;
}

/**
 * One static file for an image shown `width` pixels wide (already doubled for
 * sharp screens): the narrowest optimized file that is at least that wide. For a
 * logo or a card that repeats, where a srcset would only add weight to the page.
 */
export function staticSrc(src: string, width: number): string {
  const image = resolveImage(src);
  return image ? fileFor(image, width).src : src;
}

/** The JPEG share image made for a post's cover, when there is one. */
export function coverShareImage(src: string): ImageFile | null {
  const key = mediaKey(src);
  const og = key ? media[key]?.og : undefined;
  return og ? mediaFile(og.key, og.width, og.height) : null;
}
