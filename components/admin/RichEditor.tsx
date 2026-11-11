"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Editor, JSONContent } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import { postExtensions } from "@/lib/editor/extensions";
import { EditorIcon, type EditorIconName } from "./EditorIcon";
import { uploadImage } from "./upload";

interface Props {
  content: JSONContent | string;
  dir: "rtl" | "ltr";
  lang: string;
  onDirChange: (dir: "rtl" | "ltr") => void;
  /** Called on every change to the document. */
  onChange: () => void;
  /** Hands the editor to the form, which reads the document from it when saving. */
  onEditor: (editor: Editor | null) => void;
  onMessage: (kind: "saved" | "error", text: string) => void;
}

function Button({ icon, label, on, disabled, onClick }: { icon: EditorIconName; label: string; on?: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    // Keeping the press from taking focus leaves the selection in the text.
    <button type="button" className="adm-tool" aria-label={label} title={label} aria-pressed={on} disabled={disabled} onMouseDown={(event) => event.preventDefault()} onClick={onClick}>
      <EditorIcon name={icon} />
    </button>
  );
}

function Text({ children, onClick, danger }: { children: ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button type="button" className="adm-tool adm-tool-text" data-danger={danger || undefined} onMouseDown={(event) => event.preventDefault()} onClick={onClick}>
      {children}
    </button>
  );
}

const BLOCKS = [
  { value: "p", label: "فقرة" },
  { value: "h2", label: "عنوان قسم (H2)" },
  { value: "h3", label: "عنوان فرعي (H3)" },
  { value: "h4", label: "عنوان صغير (H4)" },
  { value: "quote", label: "اقتباس" },
  { value: "code", label: "نص برمجي" },
] as const;

/**
 * The article editor: a full toolbar over a writing surface that looks like
 * the published page. Images are resized in the browser and sent to the media
 * bucket, whether picked, dropped or pasted. Everything the editor can hold is
 * defined by one schema (lib/editor/extensions.ts), so pasted formatting that
 * the site does not use is dropped on the way in, and the HTML view can only
 * produce what the schema allows.
 */
export function RichEditor({ content, dir, lang, onDirChange, onChange, onEditor, onMessage }: Props) {
  const [panel, setPanel] = useState<"none" | "link" | "table" | "html">("none");
  const [link, setLink] = useState({ href: "", newTab: false });
  const [grid, setGrid] = useState({ rows: 3, cols: 3 });
  const [source, setSource] = useState("");
  const [full, setFull] = useState(false);
  const [uploading, setUploading] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor | null>(null);

  const upload = async (files: File[], position?: number) => {
    const images = files.filter((file) => file.type.startsWith("image/"));
    if (images.length === 0) return;
    setUploading((count) => count + images.length);
    for (const file of images) {
      try {
        const image = await uploadImage(file);
        const node = { type: "figure", attrs: { src: image.url, width: image.width, height: image.height, alt: "", caption: "" } };
        const chain = editorRef.current?.chain().focus();
        if (position === undefined) chain?.insertContent(node).run();
        else chain?.insertContentAt(position, node).run();
        onMessage("saved", "رُفعت الصورة. أضف لها نصاً بديلاً يصفها.");
      } catch (error) {
        onMessage("error", error instanceof Error ? error.message : "تعذّر رفع الصورة.");
      } finally {
        setUploading((count) => count - 1);
      }
    }
  };

  const editor = useEditor({
    extensions: postExtensions,
    content,
    immediatelyRender: false,
    // The toolbar reads the selection (bold or not, in a table or not), so it redraws on every change.
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: { class: "blg-body adm-prose", "aria-label": "محتوى المقال", role: "textbox", "aria-multiline": "true" },
      handleDrop: (view, event) => {
        const files = [...(event.dataTransfer?.files ?? [])];
        if (!files.some((file) => file.type.startsWith("image/"))) return false;
        event.preventDefault();
        void upload(files, view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos);
        return true;
      },
      handlePaste: (_, event) => {
        const files = [...(event.clipboardData?.files ?? [])];
        if (!files.some((file) => file.type.startsWith("image/"))) return false;
        event.preventDefault();
        void upload(files);
        return true;
      },
    },
    onUpdate: onChange,
  });

  useEffect(() => {
    editorRef.current = editor;
    onEditor(editor);
  }, [editor, onEditor]);

  // Full screen ends with Escape, and the page behind it does not scroll.
  useEffect(() => {
    if (!full) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setFull(false);
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [full]);

  // Read straight from the editor on each render. (Tiptap's useEditorState gives
  // nothing until the first edit, which left the editor hidden behind its own
  // loading state.)
  const read = (e: Editor) => {
    const words = e.getText().split(/\s+/).filter(Boolean).length;
    return {
      block: e.isActive("heading", { level: 2 }) ? "h2" : e.isActive("heading", { level: 3 }) ? "h3" : e.isActive("heading", { level: 4 }) ? "h4" : e.isActive("blockquote") ? "quote" : e.isActive("codeBlock") ? "code" : "p",
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      code: e.isActive("code"),
      link: e.isActive("link"),
      bullets: e.isActive("bulletList"),
      numbers: e.isActive("orderedList"),
      inList: e.isActive("listItem"),
      callout: e.isActive("callout"),
      faq: e.isActive("details"),
      table: e.isActive("table"),
      figure: e.isActive("figure"),
      figureAttrs: e.getAttributes("figure") as { alt?: string; caption?: string },
      align: (e.getAttributes("heading").align ?? e.getAttributes("paragraph").align ?? "start") as string,
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
      words,
      minutes: Math.max(1, Math.round(words / 200)),
    };
  };
  const state = editor ? read(editor) : null;

  if (!editor || !state) return <div className="adm-canvas adm-canvas-loading" aria-hidden="true" />;
  const chain = () => editor.chain().focus();
  const toggle = (name: typeof panel) => setPanel((current) => (current === name ? "none" : name));

  const setBlock = (value: string) => {
    if (value === "p") chain().clearNodes().setParagraph().run();
    else if (value === "quote") chain().clearNodes().toggleBlockquote().run();
    else if (value === "code") chain().clearNodes().toggleCodeBlock().run();
    else chain().clearNodes().setHeading({ level: Number(value[1]) as 2 | 3 | 4 }).run();
  };
  const setAlign = (value: "start" | "center" | "end") => {
    const align = value === "start" ? null : value;
    chain().updateAttributes("paragraph", { align }).updateAttributes("heading", { align }).run();
  };
  const openLink = () => {
    const attrs = editor.getAttributes("link") as { href?: string; target?: string };
    setLink({ href: attrs.href ?? "", newTab: attrs.target === "_blank" });
    toggle("link");
  };
  const applyLink = () => {
    const href = link.href.trim();
    if (!href) chain().extendMarkRange("link").unsetLink().run();
    else chain().extendMarkRange("link").setLink({ href, target: link.newTab ? "_blank" : null, rel: link.newTab ? "noopener" : null }).run();
    setPanel("none");
  };
  const openSource = () => {
    setSource(editor.getHTML());
    toggle("html");
  };
  const applySource = () => {
    // The schema parses the HTML, so only what the editor allows comes through.
    chain().setContent(source, { emitUpdate: true }).run();
    setPanel("none");
  };

  return (
    <div className="adm-rich" data-full={full || undefined}>
      <div className="adm-toolbar" role="toolbar" aria-label="تنسيق المحتوى">
        <div className="adm-tools">
          <Button icon="undo" label="تراجع" disabled={!state.canUndo} onClick={() => chain().undo().run()} />
          <Button icon="redo" label="إعادة" disabled={!state.canRedo} onClick={() => chain().redo().run()} />
        </div>
        <div className="adm-tools">
          <select className="adm-tool-select" aria-label="نمط الفقرة" value={state.block} onChange={(event) => setBlock(event.target.value)}>
            {BLOCKS.map((block) => (
              <option key={block.value} value={block.value}>
                {block.label}
              </option>
            ))}
          </select>
        </div>
        <div className="adm-tools">
          <Button icon="bold" label="غامق" on={state.bold} onClick={() => chain().toggleBold().run()} />
          <Button icon="italic" label="مائل" on={state.italic} onClick={() => chain().toggleItalic().run()} />
          <Button icon="underline" label="تسطير" on={state.underline} onClick={() => chain().toggleUnderline().run()} />
          <Button icon="strike" label="يتوسطه خط" on={state.strike} onClick={() => chain().toggleStrike().run()} />
          <Button icon="code" label="رمز برمجي" on={state.code} onClick={() => chain().toggleCode().run()} />
          <Button icon="clear" label="إزالة التنسيق" onClick={() => chain().unsetAllMarks().run()} />
        </div>
        <div className="adm-tools">
          <Button icon="alignStart" label="محاذاة إلى البداية" on={state.align === "start"} onClick={() => setAlign("start")} />
          <Button icon="alignCenter" label="توسيط" on={state.align === "center"} onClick={() => setAlign("center")} />
          <Button icon="alignEnd" label="محاذاة إلى النهاية" on={state.align === "end"} onClick={() => setAlign("end")} />
        </div>
        <div className="adm-tools">
          <Button icon="bullets" label="قائمة نقطية" on={state.bullets} onClick={() => chain().toggleBulletList().run()} />
          <Button icon="numbers" label="قائمة مرقمة" on={state.numbers} onClick={() => chain().toggleOrderedList().run()} />
          <Button icon="indent" label="زيادة المسافة البادئة" disabled={!state.inList} onClick={() => chain().sinkListItem("listItem").run()} />
          <Button icon="outdent" label="إنقاص المسافة البادئة" disabled={!state.inList} onClick={() => chain().liftListItem("listItem").run()} />
        </div>
        <div className="adm-tools">
          <Button icon="link" label="رابط" on={state.link || panel === "link"} onClick={openLink} />
          <Button icon="image" label="صورة" onClick={() => fileRef.current?.click()} />
          <Button icon="table" label="جدول" on={state.table || panel === "table"} onClick={() => toggle("table")} />
          <Button icon="callout" label="مربع تنبيه" on={state.callout} onClick={() => chain().toggleWrap("callout").run()} />
          <Button icon="faq" label="سؤال وجواب" on={state.faq} onClick={() => (state.faq ? chain().unsetDetails().run() : chain().setDetails().run())} />
          <Button icon="rule" label="خط فاصل" onClick={() => chain().setHorizontalRule().run()} />
        </div>
        <div className="adm-tools adm-tools-end">
          <Button icon="direction" label={dir === "rtl" ? "اتجاه الكتابة: من اليمين. اضغط للتبديل" : "اتجاه الكتابة: من اليسار. اضغط للتبديل"} onClick={() => onDirChange(dir === "rtl" ? "ltr" : "rtl")} />
          <Button icon="html" label="عرض HTML" on={panel === "html"} onClick={openSource} />
          <Button icon="full" label={full ? "إنهاء ملء الشاشة" : "ملء الشاشة"} on={full} onClick={() => setFull((value) => !value)} />
        </div>

        {panel === "link" && (
          <form
            className="adm-tools adm-tools-context"
            onSubmit={(event) => {
              event.preventDefault();
              applyLink();
            }}
          >
            <label className="adm-inline adm-inline-wide">
              <span>الرابط</span>
              <input value={link.href} onChange={(event) => setLink({ ...link, href: event.target.value })} dir="ltr" placeholder="/accounting/… أو https://…" autoFocus />
            </label>
            <label className="adm-check">
              <input type="checkbox" checked={link.newTab} onChange={(event) => setLink({ ...link, newTab: event.target.checked })} />
              <span>يفتح في نافذة جديدة</span>
            </label>
            <button type="submit" className="adm-tool adm-tool-text">
              تطبيق
            </button>
            {state.link && (
              <Text
                danger
                onClick={() => {
                  chain().extendMarkRange("link").unsetLink().run();
                  setPanel("none");
                }}
              >
                إزالة الرابط
              </Text>
            )}
          </form>
        )}

        {(panel === "table" || state.table) && (
          <div className="adm-tools adm-tools-context">
            {!state.table ? (
              <>
                <label className="adm-inline adm-inline-number">
                  <span>الصفوف</span>
                  <input type="number" min={1} max={30} value={grid.rows} onChange={(event) => setGrid({ ...grid, rows: Number(event.target.value) || 1 })} />
                </label>
                <label className="adm-inline adm-inline-number">
                  <span>الأعمدة</span>
                  <input type="number" min={1} max={10} value={grid.cols} onChange={(event) => setGrid({ ...grid, cols: Number(event.target.value) || 1 })} />
                </label>
                <Text
                  onClick={() => {
                    chain().insertTable({ rows: Math.min(30, grid.rows), cols: Math.min(10, grid.cols), withHeaderRow: true }).run();
                    setPanel("none");
                  }}
                >
                  إدراج الجدول
                </Text>
              </>
            ) : (
              <>
                <Text onClick={() => chain().addRowBefore().run()}>صف قبل</Text>
                <Text onClick={() => chain().addRowAfter().run()}>صف بعد</Text>
                <Text onClick={() => chain().deleteRow().run()}>حذف الصف</Text>
                <Text onClick={() => chain().addColumnBefore().run()}>عمود قبل</Text>
                <Text onClick={() => chain().addColumnAfter().run()}>عمود بعد</Text>
                <Text onClick={() => chain().deleteColumn().run()}>حذف العمود</Text>
                <Text onClick={() => chain().toggleHeaderRow().run()}>صف العناوين</Text>
                <Text onClick={() => chain().mergeOrSplit().run()}>دمج أو فصل الخلايا</Text>
                <Text danger onClick={() => chain().deleteTable().run()}>
                  حذف الجدول
                </Text>
              </>
            )}
          </div>
        )}

        {state.figure && (
          <div className="adm-tools adm-tools-context">
            <label className="adm-inline">
              <span>النص البديل</span>
              <input value={state.figureAttrs.alt ?? ""} onChange={(event) => editor.commands.updateAttributes("figure", { alt: event.target.value })} dir={dir} placeholder="وصف الصورة لمن لا يراها" />
            </label>
            <label className="adm-inline">
              <span>الشرح</span>
              <input value={state.figureAttrs.caption ?? ""} onChange={(event) => editor.commands.updateAttributes("figure", { caption: event.target.value })} dir={dir} placeholder="يظهر تحت الصورة (اختياري)" />
            </label>
            <Text danger onClick={() => chain().deleteSelection().run()}>
              حذف الصورة
            </Text>
          </div>
        )}

        {panel === "html" && (
          <div className="adm-tools adm-tools-context adm-source">
            <textarea value={source} onChange={(event) => setSource(event.target.value)} dir="ltr" rows={12} aria-label="HTML المقال" spellCheck={false} />
            <Text onClick={applySource}>تطبيق HTML</Text>
            <Text onClick={() => setPanel("none")}>إلغاء</Text>
            <p className="adm-hint">يُقبل فقط ما يدعمه المحرر: العناوين والفقرات والقوائم والجداول والروابط والصور. أي وسم آخر يُحذف.</p>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(event) => {
            void upload([...(event.target.files ?? [])]);
            event.target.value = "";
          }}
        />
      </div>

      <div className="adm-canvas" dir={dir} lang={lang}>
        <EditorContent editor={editor} />
      </div>

      <p className="adm-statusbar num" aria-live="polite">
        <span>{state.words} كلمة</span>
        <span>{state.minutes} دقيقة قراءة</span>
        <span>{uploading > 0 ? "جارٍ رفع الصورة…" : "اسحب الصور إلى النص أو الصقها لرفعها"}</span>
      </p>
    </div>
  );
}
