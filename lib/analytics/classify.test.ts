/**
 * The link classifier against every kind of destination the site links to.
 * Run with `pnpm test`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { classifyLink } from "./classify.ts";
import { site } from "../seo/site.ts";

const origin = "https://getvom.com";
const event = (href: string, download = false) => classifyLink(href, { origin, download })?.event ?? null;

test("links inside the site are left to data-track", () => {
  assert.equal(event("/pricing/"), null);
  assert.equal(event("https://getvom.com/en/pricing/"), null);
  assert.equal(event("#compare"), null);
  assert.equal(event("https://media.getvom.com/2024/01/picture.webp"), null);
});

test("the app: sign-up, login and API docs", () => {
  assert.equal(event(site.signup.ar), "signup_cta_clicked");
  assert.equal(event(site.signup.en), "signup_cta_clicked");
  assert.equal(event(site.login), "login_clicked");
  assert.equal(event("https://app.getvom.com/ar/company-login-show"), "login_clicked");
  assert.equal(event("https://app.getvom.com/en/docs/api"), "api_docs_clicked");
});

test("contact: demo, WhatsApp, phone and email", () => {
  assert.equal(event(site.demo), "demo_booking_clicked");
  assert.equal(event(site.whatsappUrl), "whatsapp_clicked");
  assert.equal(event("https://wa.me/966502309337"), "whatsapp_clicked");
  assert.equal(event("tel:+966502309337"), "phone_clicked");
  assert.equal(event(`mailto:${site.email}`), "email_clicked");
});

test("downloads: local files, the media bucket, the download attribute and Google files", () => {
  const local = classifyLink("/wp-content/uploads/2023/10/Invoice%20one.docx", { origin });
  assert.deepEqual(local, { event: "file_downloaded", props: { file_name: "Invoice one.docx", file_type: "docx", host: "getvom.com" } });
  assert.equal(classifyLink("https://media.getvom.com/2024/05/plan.pdf", { origin })?.props.file_type, "pdf");
  assert.equal(event("/files/template", true), "file_downloaded");
  assert.equal(classifyLink("https://docs.google.com/spreadsheets/d/abc/edit", { origin })?.props.file_type, "google_spreadsheets");
  assert.equal(event("https://drive.google.com/file/d/abc/view"), "file_downloaded");
});

test("Google Forms are the growth program's applications, not downloads", () => {
  assert.equal(event(site.growthForms.apply), "growth_form_clicked");
  assert.equal(event(site.growthForms.partner), "growth_form_clicked");
});

test("stores, social networks, student links and the help centre", () => {
  assert.deepEqual(classifyLink(site.appStore, { origin }), { event: "app_store_clicked", props: { store: "app_store" } });
  assert.equal(classifyLink("https://play.google.com/store/apps/details?id=x", { origin })?.props.store, "google_play");
  for (const [network, url] of Object.entries(site.social)) {
    assert.deepEqual(classifyLink(url, { origin }), { event: "social_link_clicked", props: { network } });
  }
  assert.equal(event(site.studentLinks.student.ar), "student_offer_clicked");
  assert.equal(event("https://getvom.zendesk.com/hc/ar"), "help_center_clicked");
});

test("any other site is an outbound link, with its domain", () => {
  assert.deepEqual(classifyLink("https://www.zatca.gov.sa/ar/E-Invoicing/", { origin }), {
    event: "outbound_link_clicked",
    props: { domain: "zatca.gov.sa", href: "https://www.zatca.gov.sa/ar/E-Invoicing/" },
  });
});

test("addresses that are not links to anywhere are ignored", () => {
  assert.equal(event("javascript:void(0)"), null);
  assert.equal(event("http://["), null);
});
