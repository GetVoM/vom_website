import { test } from "node:test";
import assert from "node:assert/strict";
import { leadForms } from "./forms.ts";
import { DIGITAL_ADS_FORM } from "./digital-ads-2023.ts";
import { ZATCA_PHASE_2_FORM } from "./zatca-phase-2.ts";
import { VOM_PAY_FORM, isKnownPayError, readPayError } from "./vom-pay.ts";

const schema = leadForms[DIGITAL_ADS_FORM].schema;
const issues = (data: unknown) => {
  const result = schema.safeParse(data);
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join("."));
};

test("the campaign form needs only a name and a Saudi mobile", () => {
  const result = schema.safeParse({ name: "سارة", phone: "+966 51 234 5678" });
  assert.ok(result.success);
  assert.deepEqual(result.data, { name: "سارة", phone: "0512345678" });
});

test("it keeps an email and a sector when given", () => {
  const result = schema.safeParse({ name: "سارة", phone: "٠٥١٢٣٤٥٦٧٨", email: "sara@example.com", payload: { sector: "النقل" } });
  assert.ok(result.success);
  assert.equal(result.data.phone, "0512345678");
  assert.deepEqual(result.data.payload, { sector: "النقل" });
});

test("a missing name or mobile is refused", () => {
  assert.deepEqual(issues({ phone: "0512345678" }), ["name"]);
  assert.deepEqual(issues({ name: "س", phone: "0512345678" }), ["name"]);
  assert.deepEqual(issues({ name: "سارة" }), ["phone"]);
});

test("a mobile that is not Saudi is refused", () => {
  assert.deepEqual(issues({ name: "سارة", phone: "0412345678" }), ["phone"]);
  assert.deepEqual(issues({ name: "سارة", phone: "051234567" }), ["phone"]);
});

test("a typed email must look like one; a sector must be on the list", () => {
  assert.deepEqual(issues({ name: "سارة", phone: "0512345678", email: "sara@" }), ["email"]);
  assert.deepEqual(issues({ name: "سارة", phone: "0512345678", payload: { sector: "قطاع غير موجود" } }), ["payload.sector"]);
});

const zatca = leadForms[ZATCA_PHASE_2_FORM].schema;

test("the ZATCA Phase 2 form needs a name and a Saudi mobile, stored as 05XXXXXXXX", () => {
  const result = zatca.safeParse({ name: "Sara", phone: "٠٥١٢٣٤٥٦٧٨" });
  assert.ok(result.success);
  assert.deepEqual(result.data, { name: "Sara", phone: "0512345678" });
  assert.equal(zatca.safeParse({ phone: "0512345678" }).success, false);
  assert.equal(zatca.safeParse({ name: "Sara", phone: "0412345678" }).success, false);
});

test("the ZATCA Phase 2 form drops fields it never asks for", () => {
  const result = zatca.safeParse({ name: "Sara", phone: "0512345678", email: "sara@example.com", payload: { sector: "النقل" } });
  assert.ok(result.success);
  assert.deepEqual(result.data, { name: "Sara", phone: "0512345678" });
});

const vomPay = leadForms[VOM_PAY_FORM].schema;

test("the VoM Pay form needs a name and a Saudi mobile; email is optional but checked", () => {
  const result = vomPay.safeParse({ name: "سارة", phone: "+966 51 234 5678" });
  assert.ok(result.success);
  assert.deepEqual(result.data, { name: "سارة", phone: "0512345678" });
  assert.equal(vomPay.safeParse({ phone: "0512345678" }).success, false);
  assert.equal(vomPay.safeParse({ name: "سارة", phone: "0412345678" }).success, false);
  assert.equal(vomPay.safeParse({ name: "سارة", phone: "0512345678", email: "sara@" }).success, false);
  assert.ok(vomPay.safeParse({ name: "Sara", phone: "0512345678", email: "sara@example.com" }).success);
});

test("the failure page reads the app's code and nothing else", () => {
  assert.equal(readPayError("?vom_pay_errors=2"), "2");
  assert.equal(readPayError("?vom_pay_errors=%202%20"), "2");
  assert.equal(readPayError("?vom_pay_errors=9"), "9");
  assert.equal(readPayError("?vom_pay_errors=<b>"), null);
  assert.equal(readPayError("?vom_pay_errors=12345"), null);
  assert.equal(readPayError(""), null);
  assert.equal(isKnownPayError("3"), true);
  assert.equal(isKnownPayError("9"), false);
  assert.equal(isKnownPayError(null), false);
});
