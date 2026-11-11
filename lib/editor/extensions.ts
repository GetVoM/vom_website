/**
 * The document schema for posts: what the editor can hold, and nothing else.
 * The admin editor, the save action and scripts/import-wordpress.mjs all build
 * their Tiptap documents and their HTML from this one list, so a post imported
 * from WordPress and a post written in the editor have the same shape.
 *
 * Keep this file free of path aliases and TypeScript-only syntax: the import
 * script loads it directly with Node.
 */
import { Extension, Node, mergeAttributes, type Extensions } from "@tiptap/core";
import { Details, DetailsContent, DetailsSummary } from "@tiptap/extension-details";
import { TableKit } from "@tiptap/extension-table";
import { StarterKit } from "@tiptap/starter-kit";

const toNumber = (value: string | null) => {
  const number = value ? Number.parseInt(value, 10) : Number.NaN;
  return Number.isFinite(number) && number > 0 ? number : null;
};

const imageAttrs = (img: Element) => ({
  src: img.getAttribute("src"),
  alt: img.getAttribute("alt") ?? "",
  width: toNumber(img.getAttribute("width")),
  height: toNumber(img.getAttribute("height")),
});

/** An image with its alt text and an optional caption: `<figure><img><figcaption>`. */
export const Figure = Node.create({
  name: "figure",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: "" },
      caption: { default: "" },
      width: { default: null },
      height: { default: null },
    };
  },
  parseHTML() {
    return [
      {
        tag: "figure",
        getAttrs: (element) => {
          const img = element.querySelector("img[src]");
          if (!img) return false;
          return { ...imageAttrs(img), caption: element.querySelector("figcaption")?.textContent?.trim() ?? "" };
        },
      },
      { tag: "img[src]", getAttrs: (element) => imageAttrs(element) },
    ];
  },
  renderHTML({ node }) {
    const { src, alt, caption, width, height } = node.attrs;
    const img = ["img", { src, alt, ...(width && height ? { width, height } : {}) }] as const;
    return caption ? ["figure", img, ["figcaption", caption]] : ["figure", img];
  },
});

/** A boxed note: `<aside class="callout">`. */
export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  parseHTML() {
    return [{ tag: "aside.callout" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["aside", mergeAttributes(HTMLAttributes, { class: "callout" }), 0];
  },
});

/**
 * Centres or end-aligns a paragraph or heading: `data-align="center"`. An
 * attribute rather than a style, because stored HTML carries no inline styles.
 * Start alignment is the default and writes nothing.
 */
export const Align = Extension.create({
  name: "align",
  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          align: {
            default: null,
            parseHTML: (element) => {
              const value = element.getAttribute("data-align") ?? (element.style.textAlign === "center" ? "center" : null);
              return value === "center" || value === "end" ? value : null;
            },
            renderHTML: (attributes) => (attributes.align ? { "data-align": attributes.align } : {}),
          },
        },
      },
    ];
  },
});

export const postExtensions: Extensions = [
  StarterKit.configure({
    // The post's title is the page's only H1.
    heading: { levels: [2, 3, 4] },
    link: {
      openOnClick: false,
      autolink: false,
      // Each link keeps its own target and rel; nothing is added to all of them.
      HTMLAttributes: { target: null, rel: null, class: null },
    },
  }),
  TableKit.configure({ table: { resizable: false, HTMLAttributes: { class: null } } }),
  // A question and its answer: `<details class="faq"><summary>…</summary><div>…</div></details>`.
  Details.configure({ persist: false, HTMLAttributes: { class: "faq" } }),
  DetailsSummary,
  DetailsContent,
  Figure,
  Callout,
  Align,
];
