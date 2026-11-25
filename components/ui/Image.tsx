import { resolveImage } from "@/lib/images";
import { ImageView, type ImageViewProps } from "./ImageView";

/**
 * The site's image, for server components (ESLint keeps next/image out of other
 * files). It looks up the image's pre-optimized files and renders them with
 * ImageView: a public/ path such as /features/x.png becomes
 * /images/optimized/features/x.webp, with a srcset when smaller copies exist.
 */
export default function Image(props: Omit<ImageViewProps, "image">) {
  return <ImageView {...props} image={resolveImage(props.src)} />;
}
