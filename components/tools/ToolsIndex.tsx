import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BlogClose } from "@/components/blog/PostPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { Icon } from "@/components/ui/Icon";
import { toolCovers, toolGroups, toolPath, tools, toolsIndex, toolsModified, type ToolEntry } from "@/lib/content/tools";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { breadcrumbJsonLd, toolCollectionJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { toolsCopy } from "./copy";

/** Arabic only. The old archive's title and description, kept byte for byte. */
export function toolsIndexMetadata(): Metadata {
  const meta = buildMetadata({
    locale: "ar",
    path: toolsIndex.path,
    alternatePath: null,
    title: toolsIndex.seoTitle,
    description: toolsIndex.description,
    image: "/og/tools/index.png",
  });
  return { ...meta, title: { absolute: toolsIndex.seoTitle } };
}

/** The plate's picture: the old page's cover, or, for the two without one, its worked example drawn on the field. */
function PlateArt({ tool }: { tool: ToolEntry }) {
  const cover = toolCovers[tool.id];
  if (cover) {
    return <Image src={cover.src} width={cover.width} height={cover.height} alt="" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />;
  }
  const drawn = toolsCopy.drawn[tool.id as keyof typeof toolsCopy.drawn];
  return (
    <span className="tix-drawn guilloche-tile" role="img" aria-label={drawn.alt}>
      <span className="tix-drawn-figure" dir="ltr">
        {drawn.figure}
      </span>
      <span className="tix-drawn-line">{drawn.line}</span>
    </span>
  );
}

function Plate({ tool, n, wide }: { tool: ToolEntry; n: number; wide?: boolean }) {
  return (
    <li className="tix-plate" data-wide={wide || undefined} style={{ "--n": n } as CSSProperties}>
      <Link href={toolPath(tool.id)} className="tix-plate-link">
        <span className="tix-plate-art">
          <PlateArt tool={tool} />
        </span>
        <span className="tix-plate-words">
          <span className="tix-plate-name">{tool.cardTitle}</span>
          <span className="tix-plate-line">{tool.cardLine}</span>
          <span className="tix-plate-open">
            {toolsCopy.open}
            <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
          </span>
        </span>
      </Link>
    </li>
  );
}

/**
 * The financial tools index: the seven calculators as framed plates showing
 * their own covers, filed under three groups. A group of one lies its plate
 * across the row.
 */
export function ToolsIndex() {
  const t = getDictionary("ar");
  let n = 0;
  return (
    <>
      <JsonLd
        data={toolCollectionJsonLd({
          path: toolsIndex.path,
          name: toolsIndex.h1,
          description: toolsCopy.intro,
          modified: toolsModified,
          tools: tools.map((tool) => ({ name: tool.cardTitle, description: tool.cardLine, path: toolPath(tool.id) })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd("ar", [
          { name: t.nav.home, path: "/" },
          { name: toolsIndex.h1, path: toolsIndex.path },
        ])}
      />

      <header className="page-wrap tix-head">
        <Breadcrumb items={[{ label: t.nav.home, href: "/" }, { label: toolsIndex.h1 }]} label={t.nav.breadcrumb} />
        <h1 className="tix-title">{toolsIndex.h1}</h1>
        <p className="tix-intro">{toolsCopy.intro}</p>
      </header>

      <div className="page-wrap tix-groups">
        {toolGroups.map((group) => {
          const members = tools.filter((tool) => tool.group === group.id);
          return (
            <section key={group.id} className="tix-group" aria-labelledby={`tix-${group.id}`}>
              <h2 id={`tix-${group.id}`} className="tix-group-name">
                {group.name}
                <span className="num" dir="ltr">
                  {members.length}
                </span>
              </h2>
              <ul className="tix-plates" role="list">
                {members.map((tool) => (
                  <Plate key={tool.id} tool={tool} n={n++} wide={members.length === 1} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <BlogClose locale="ar" />
    </>
  );
}
