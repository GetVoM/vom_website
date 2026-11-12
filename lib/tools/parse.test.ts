import { test } from "node:test";
import assert from "node:assert/strict";
import { parseAmount } from "./parse.ts";

test("Western digits with separators", () => {
  assert.deepEqual(parseAmount("12,345.67"), { value: 12345.67 });
  assert.deepEqual(parseAmount(" 2 500 "), { value: 2500 });
});

test("Arabic-Indic digits with the Arabic decimal and thousands marks", () => {
  assert.deepEqual(parseAmount("١٢٬٣٤٥٫٦٧"), { value: 12345.67 });
  assert.deepEqual(parseAmount("١٥٪"), { value: 15 });
});

test("Persian digits", () => {
  assert.deepEqual(parseAmount("۱۵"), { value: 15 });
});

test("invisible direction marks, % and the riyal sign or word", () => {
  assert.deepEqual(parseAmount("‏15"), { value: 15 });
  assert.deepEqual(parseAmount("15%"), { value: 15 });
  assert.deepEqual(parseAmount("⃁ 100"), { value: 100 });
  assert.deepEqual(parseAmount("100 ر.س"), { value: 100 });
});

test("empty is no value, not zero", () => {
  assert.deepEqual(parseAmount(""), { value: null });
  assert.deepEqual(parseAmount("   "), { value: null });
});

test("bad input", () => {
  assert.deepEqual(parseAmount("1.2.3"), { value: null, error: "invalid" });
  assert.deepEqual(parseAmount("abc"), { value: null, error: "invalid" });
  assert.deepEqual(parseAmount("."), { value: null, error: "invalid" });
  assert.deepEqual(parseAmount("-5"), { value: null, error: "negative" });
  assert.deepEqual(parseAmount("9".repeat(14)), { value: null, error: "tooLarge" });
});
