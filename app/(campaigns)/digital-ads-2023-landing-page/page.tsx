import type { Metadata } from "next";
import { DigitalAds2023 } from "@/components/campaigns/DigitalAds2023";
import { digitalAds2023 as page } from "@/lib/content/campaigns/digital-ads-2023";
import { site } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: { absolute: page.seoTitle },
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: {
    title: page.seoTitle,
    description: page.description,
    url: page.path,
    siteName: site.name.ar,
    locale: "ar_SA",
    type: "website",
    images: [{ url: page.ogImage, width: 1200, height: 630, alt: page.seoTitle }],
  },
};

export default function DigitalAds2023Page() {
  return <DigitalAds2023 />;
}
