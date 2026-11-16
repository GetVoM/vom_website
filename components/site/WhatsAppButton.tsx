import { site } from "@/lib/seo/site";
import { SocialGlyph } from "@/components/contact/SocialGlyph";

/** The floating WhatsApp disc on every site page; the campaign page draws its own (`.lp-whatsapp`). */
export function WhatsAppButton({ label }: { label: string }) {
  return (
    <a className="site-whatsapp" href={site.whatsappUrl} target="_blank" rel="noopener" aria-label={label}>
      <SocialGlyph id="whatsapp" size={28} />
    </a>
  );
}
