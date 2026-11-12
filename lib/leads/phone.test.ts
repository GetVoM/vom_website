import { test } from "node:test";
import assert from "node:assert/strict";
import { normaliseSaudiMobile } from "./phone.ts";

test("the stored form passes as it is", () => {
  assert.equal(normaliseSaudiMobile("0512345678"), "0512345678");
});

test("Arabic-Indic and Persian digits", () => {
  assert.equal(normaliseSaudiMobile("٠٥١٢٣٤٥٦٧٨"), "0512345678");
  assert.equal(normaliseSaudiMobile("۰۵۱۲۳۴۵۶۷۸"), "0512345678");
});

test("the country code in its three spellings", () => {
  assert.equal(normaliseSaudiMobile("+966 51 234 5678"), "0512345678");
  assert.equal(normaliseSaudiMobile("00966512345678"), "0512345678");
  assert.equal(normaliseSaudiMobile("966512345678"), "0512345678");
  assert.equal(normaliseSaudiMobile("+٩٦٦٥١٢٣٤٥٦٧٨"), "0512345678");
  // A common slip: the code and the zero together. Still one unambiguous number.
  assert.equal(normaliseSaudiMobile("+966 0512345678"), "0512345678");
});

test("without the leading zero, and with separators or pasted direction marks", () => {
  assert.equal(normaliseSaudiMobile("512345678"), "0512345678");
  assert.equal(normaliseSaudiMobile("051-234-5678"), "0512345678");
  assert.equal(normaliseSaudiMobile("(051) 234.5678"), "0512345678");
  assert.equal(normaliseSaudiMobile("‎0512345678‏"), "0512345678");
});

test("anything that is not a Saudi mobile is refused", () => {
  assert.equal(normaliseSaudiMobile(""), null);
  assert.equal(normaliseSaudiMobile("0412345678"), null, "a landline");
  assert.equal(normaliseSaudiMobile("051234567"), null, "9 digits");
  assert.equal(normaliseSaudiMobile("05123456789"), null, "11 digits");
  assert.equal(normaliseSaudiMobile("+201012345678"), null, "an Egyptian number");
  assert.equal(normaliseSaudiMobile("05123abc78"), null);
  assert.equal(normaliseSaudiMobile("+966 412345678"), null, "a landline with the code");
});
