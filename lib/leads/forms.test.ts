import { test } from "node:test";
import assert from "node:assert/strict";
import { leadForms } from "./forms.ts";
import { DIGITAL_ADS_FORM } from "./digital-ads-2023.ts";

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
