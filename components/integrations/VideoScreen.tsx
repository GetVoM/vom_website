"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Raster } from "@/lib/integrations";

export interface ScreenVideo {
  youtubeId: string;
  /** Display title in the page's language. */
  title: string;
  /** "7:02". */
  length: string;
  poster: Raster;
  seal?: { x: string; y: string };
}

/**
 * The connection video on its paper screen. Only the poster ships with the page:
 * YouTube's player loads when the visitor presses play, never before. With two
 * videos, the entries under the screen switch between them and start the one chosen.
 * The page's "watch" link (href="#watch") starts the video too.
 */
export function VideoScreen({
  videos,
  playLabel,
  inArabic,
}: {
  videos: ScreenVideo[];
  /** `{title}` is replaced by the video's title. */
  playLabel: string;
  /** Shown after the titles when the page is not Arabic. */
  inArabic: string;
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const video = videos[active];

  // The button the visitor pressed is gone; hand focus to the player in its place.
  useEffect(() => {
    if (playing) frame.current?.focus();
  }, [playing, active]);

  // The ghost link beside Register promises the video, so following it plays it.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a[href="#watch"]')) setPlaying(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="integ-screen-wrap">
      <div className="integ-screen doc-frame">
        <div className="integ-screen-inner">
          {playing ? (
            <iframe
              ref={frame}
              key={video.youtubeId}
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen; web-share"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <button
              type="button"
              className="integ-play"
              onClick={() => setPlaying(true)}
              style={video.seal ? ({ "--seal-x": video.seal.x, "--seal-y": video.seal.y } as CSSProperties) : undefined}
            >
              <Image
                src={video.poster.src}
                alt=""
                width={video.poster.width}
                height={video.poster.height}
                preload={active === 0}
                sizes="(min-width: 1024px) 560px, calc(100vw - 56px)"
                className="integ-poster"
              />
              <span className="integ-play-seal" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="30" height="30" focusable="false">
                  <path d="M8.5 5.6v12.8a.8.8 0 0 0 1.2.7l10.2-6.4a.8.8 0 0 0 0-1.4L9.7 4.9a.8.8 0 0 0-1.2.7z" fill="currentColor" />
                </svg>
              </span>
              <span className="sr-only">{playLabel.replace("{title}", video.title)}</span>
            </button>
          )}
        </div>
      </div>

      <div className="integ-screen-notes">
        {videos.length > 1 ? (
          <ul className="integ-playlist">
            {videos.map((entry, i) => (
              <li key={entry.youtubeId}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => {
                    setActive(i);
                    setPlaying(true);
                  }}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
                    <path d="M8.5 5.6v12.8a.8.8 0 0 0 1.2.7l10.2-6.4a.8.8 0 0 0 0-1.4L9.7 4.9a.8.8 0 0 0-1.2.7z" fill="currentColor" />
                  </svg>
                  <span>{entry.title}</span>
                  <span className="num integ-length" dir="ltr">
                    {entry.length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="integ-caption">
            <span>{video.title}</span>
            <span className="num integ-length" dir="ltr">
              {video.length}
            </span>
          </p>
        )}
        {inArabic && <p className="integ-lang">{inArabic}</p>}
      </div>
    </div>
  );
}
