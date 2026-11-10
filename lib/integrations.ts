import type { IntegrationId } from "@/lib/i18n/dictionaries/types";

export type { IntegrationId };

export interface Raster {
  src: string;
  width: number;
  height: number;
}

export interface IntegrationVideo {
  youtubeId: string;
  /** The title on YouTube. Every video is in Arabic, so this is Arabic in both locales. */
  title: string;
  seconds: number;
  /** As YouTube states it, for the VideoObject's uploadDate. */
  uploaded: string;
  poster: Raster;
  /** Where the play seal sits on the poster, when the centre would cover the poster's own title. */
  seal?: { x: string; y: string };
}

export interface Integration {
  /** The VoM | partner lockup from the old page, trimmed. */
  lockup: Raster;
  /** The partner's half of the lockup. */
  mark: Raster;
  /** The first leads on the screen. */
  videos: IntegrationVideo[];
}

/** Page order, which is also the order of the tiles that link the pages together. */
export const integrationIds: IntegrationId[] = ["foodics", "marn", "zid"];

/** VoM's half of a lockup, at a resolution the brand logo file does not have. */
export const vomMark: Raster = { src: "/integrations/vom-mark.png", width: 1010, height: 327 };

/**
 * Assets come from the old WordPress pages (see public/integrations/); video facts
 * were read from YouTube on 2026-11-10.
 */
export const integrations: Record<IntegrationId, Integration> = {
  foodics: {
    lockup: { src: "/integrations/foodics/lockup.png", width: 2034, height: 271 },
    mark: { src: "/integrations/foodics/mark.png", width: 1046, height: 143 },
    videos: [
      {
        youtubeId: "aWeKfPa8E9U",
        title: "طريقة ربط ڤوم البرنامج المحاسبي مع فودكس",
        seconds: 422,
        uploaded: "2023-09-20T08:49:50-07:00",
        poster: { src: "/integrations/foodics/poster-tutorial.jpg", width: 1600, height: 893 },
        // The burned-in title spans x 5–44%, y 14–49%; the presenter's hand starts near x 63%.
        seal: { x: "54%", y: "66%" },
      },
      {
        youtubeId: "-FlZoKugpCE",
        title: "ڤوم مع فودكس",
        seconds: 28,
        uploaded: "2023-10-17T03:57:03-07:00",
        poster: { src: "/integrations/foodics/poster-short.jpg", width: 1280, height: 720 },
      },
    ],
  },
  marn: {
    lockup: { src: "/integrations/marn/lockup.png", width: 2048, height: 336 },
    mark: { src: "/integrations/marn/mark.png", width: 890, height: 195 },
    videos: [
      {
        youtubeId: "CXjwCy6tfm8",
        title: "ڤوم مع مرن",
        seconds: 28,
        uploaded: "2023-10-17T03:55:06-07:00",
        poster: { src: "/integrations/marn/poster-short.jpg", width: 1280, height: 720 },
      },
    ],
  },
  zid: {
    lockup: { src: "/integrations/zid/lockup.png", width: 2048, height: 432 },
    mark: { src: "/integrations/zid/mark.png", width: 812, height: 432 },
    videos: [
      {
        youtubeId: "1RutPr3TqbU",
        title: "ڤوم مع زد",
        seconds: 23,
        uploaded: "2023-10-17T03:49:42-07:00",
        poster: { src: "/integrations/zid/poster-short.jpg", width: 1280, height: 720 },
      },
    ],
  },
};

/** "7:02" for 422 seconds. */
export function videoLength(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/** ISO 8601 duration for schema.org, e.g. "PT7M2S". */
export function isoDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `PT${minutes ? `${minutes}M` : ""}${seconds % 60}S`;
}
