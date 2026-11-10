/**
 * A small image through the image optimizer, without a srcset: for images that
 * repeat (logos, cards), so each page's HTML and React payload stay small.
 * `width` must be one of next.config.ts `images.imageSizes` or `deviceSizes`.
 */
export function optimizedSrc(src: string, width: number): string {
  return `/_next/image/?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}
