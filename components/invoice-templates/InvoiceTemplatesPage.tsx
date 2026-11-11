import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import {
  fileSize,
  getInvoiceTemplates,
  heroSheets,
  invoiceTemplates,
  recordInvoice,
  type InvoiceTemplate,
  type InvoiceTemplatesCopy,
} from "@/lib/content/invoice-templates";
import { localePath, otherLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { invoiceTemplatesPaths } from "@/lib/i18n/routes";
import { breadcrumbJsonLd, templateCollectionJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function invoiceTemplatesMetadata(locale: Locale): Metadata {
  const c = getInvoiceTemplates(locale);
  const meta = buildMetadata({
    locale,
    path: invoiceTemplatesPaths[locale],
    alternatePath: invoiceTemplatesPaths[otherLocale(locale)],
    title: c.seo.title,
    description: c.seo.description,
    image: `/og/invoice-templates-${locale}.png`,
  });
  // The full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: c.seo.title } };
}

const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const PDF = "application/pdf";

/** The catalogue sheets' widest display width; the images carry it so their srcset holds 1x and 2x only. */
const SHEET_WIDTH = 360;

/** One template: its whole sheet on the paper side, and its entry (name, the two files, the way into VoM). */
function Template({
  template,
  c,
  signup,
  brand,
}: {
  template: InvoiceTemplate;
  c: InvoiceTemplatesCopy;
  signup: string;
  brand: string;
}) {
  const { name, alt } = c.templates[template.id];
  const files = [
    { format: c.download.word, file: template.docx },
    { format: c.download.pdf, file: template.pdf },
  ];
  // Where the sheet's empty «QR code» box sits, for the create-online preview.
  const qr = {
    "--qr-x": `${template.qr.x}%`,
    "--qr-y": `${template.qr.y}%`,
    "--qr-w": `${template.qr.w}%`,
    "--qr-h": `${template.qr.h}%`,
  } as CSSProperties;

  return (
    <li className="ivt-item">
      <div className="ivt-sheet" style={qr}>
        <Image
          src={template.image.src}
          alt={alt}
          width={SHEET_WIDTH}
          height={Math.round((template.image.height / template.image.width) * SHEET_WIDTH)}
          className="ivt-sheet-img"
        />
        <span className="ivt-qr" aria-hidden="true">
          <span className="ivt-qr-seal">{brand}</span>
        </span>
      </div>
      <div className="ivt-entry">
        <h3 className="ivt-name">{name}</h3>
        <ul className="ivt-files" role="list">
          {files.map(({ format, file }) => (
            <li key={format}>
              <a href={file.href} download className="ivt-file">
                <Icon name="download" size={18} />
                <span className="sr-only">{c.download.lead(name)}</span>
                <span className="ivt-file-format">{format}</span>{" "}
                <span className="ivt-file-size num" dir="ltr">
                  {fileSize(file.bytes)}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a href={signup} className="ivt-online" rel="noopener">
          <span>{c.createOnline}</span>
          <span className="sr-only">: {name}</span>
          <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
        </a>
      </div>
    </li>
  );
}

/**
 * The free invoice templates: paper or record. The first view faces the
 * templates you can download (plain paper) against the invoice VoM issues (the
 * teal field), with the old page's note as the hinge between them; the six
 * sheets follow on the paper side, and a teal band closes on the trial.
 */
export function InvoiceTemplatesPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = getInvoiceTemplates(locale);
  const path = invoiceTemplatesPaths[locale];
  const signup = site.signup[locale];

  return (
    <div className="ivt">
      <JsonLd
        data={templateCollectionJsonLd({
          locale,
          path,
          name: c.seo.title,
          description: c.seo.description,
          published: c.published,
          modified: c.modified,
          documents: invoiceTemplates.map((template) => ({
            name: c.templates[template.id].name,
            image: template.image.src,
            files: [
              { url: template.docx.href, format: DOCX, bytes: template.docx.bytes },
              { url: template.pdf.href, format: PDF, bytes: template.pdf.bytes },
            ],
          })),
        })}
      />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.nav.home, path: "/" }, { name: c.crumb, path }])} />

      <section className="ivt-top" aria-labelledby="ivt-title">
        <div className="page-wrap ivt-head">
          <div className="ivt-head-title">
            <Breadcrumb items={[{ label: t.nav.home, href: localePath(locale, "/") }, { label: c.crumb }]} label={t.nav.breadcrumb} />
            <h1 id="ivt-title" className="ivt-title">
              {c.h1}
            </h1>
          </div>
          <p className="ivt-intro">{c.intro}</p>
        </div>

        <div className="page-wrap ivt-split">
          <figure className="ivt-paper">
            <Image
              src={heroSheets.src}
              alt={c.heroAlt}
              width={400}
              height={Math.round((heroSheets.height / heroSheets.width) * 400)}
              preload
              className="ivt-paper-img"
            />
            <figcaption className="ivt-paper-line">
              <a href="#ivt-collection">{c.paperLine}</a>
            </figcaption>
          </figure>

          <div className="ivt-hinge">
            <p className="ivt-hinge-text">
              <strong>{c.note.statement}</strong> {c.note.offer}
            </p>
            <a href={signup} className="ivt-hinge-arrow" rel="noopener" aria-label={c.register}>
              <Icon name="arrow" size={18} className="rtl:-scale-x-100" />
            </a>
          </div>

          <div className="ivt-record">
            <div className="ivt-field guilloche-tile" aria-hidden="true" />
            <ButtonLink href={signup} arrow className="ivt-record-cta">
              {c.register}
            </ButtonLink>
            <div className="ivt-record-sheet">
              {/* VoM's invoice as a paper document, labelled as sample data inside its frame. */}
              <figure className="ivt-record-frame">
                <Image
                  src={recordInvoice.src}
                  alt={c.record.alt}
                  width={440}
                  height={Math.round((recordInvoice.height / recordInvoice.width) * 440)}
                  className="ivt-record-img"
                />
                <figcaption className="ivt-record-caption">{c.record.caption}</figcaption>
              </figure>
              <p className="ivt-seal" role="img" aria-label={`${t.certificate.sealMain}: ${t.certificate.sealTop}`}>
                <span aria-hidden="true">{t.certificate.sealTop}</span>
                <b aria-hidden="true">{t.certificate.sealMain}</b>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ivt-catalogue" aria-labelledby="ivt-collection">
        <div className="page-wrap">
          <div className="ivt-catalogue-head">
            <h2 id="ivt-collection" className="ivt-h2">
              {c.h2}
            </h2>
            {c.filesNote && <p className="ivt-files-note">{c.filesNote}</p>}
          </div>
          <ul className="ivt-list" role="list">
            {invoiceTemplates.map((template) => (
              <Template key={template.id} template={template} c={c} signup={signup} brand={site.name[locale]} />
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-close-band guilloche-dark guilloche-tile text-white" aria-label={c.close.cta}>
        <div className="page-wrap sec-close">
          <p className="sec-close-line">{c.close.line}</p>
          <div className="sec-close-actions">
            <ButtonLink href={signup} arrow>
              {c.close.cta}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
