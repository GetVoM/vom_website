/**
 * Choosing among an image's pre-optimized files. Run with `pnpm test`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileFor, resolved } from "./files.ts";

const full = { src: "/images/optimized/about/team.webp", width: 1452, height: 968 };
const small = { src: "/images/optimized/about/team-640w.webp", width: 640, height: 427 };
const mid = { src: "/images/optimized/about/team-1280w.webp", width: 1280, height: 853 };

test("one file: no srcset", () => {
  const image = resolved(full, []);
  assert.equal(image.src, full.src);
  assert.equal(image.srcSet, undefined);
  assert.deepEqual(image.files, [full]);
});

test("several files: narrowest first, srcset in width descriptors", () => {
  const image = resolved(full, [mid, small]);
  assert.deepEqual(image.files.map((f) => f.width), [640, 1280, 1452]);
  assert.equal(
    image.srcSet,
    "/images/optimized/about/team-640w.webp 640w, /images/optimized/about/team-1280w.webp 1280w, /images/optimized/about/team.webp 1452w",
  );
  assert.equal(image.width, 1452);
});

test("a copy as wide as the full file is dropped", () => {
  assert.deepEqual(resolved(full, [{ ...small, width: 1452 }]).files, [full]);
});

test("percent-encoded URLs pass through; spaces and commas are escaped", () => {
  const encoded = "https://media.getvom.com/x/%D9%81%D8%A7%D8%AA%D9%88%D8%B1%D8%A9";
  const image = resolved({ src: `${encoded}.webp`, width: 1600, height: 900 }, [
    { src: `${encoded}-w640.webp`, width: 640, height: 360 },
  ]);
  assert.equal(image.srcSet, `${encoded}-w640.webp 640w, ${encoded}.webp 1600w`);
  const odd = resolved({ src: "/a b,c.webp", width: 900, height: 600 }, [{ src: "/a b,c-640w.webp", width: 640, height: 427 }]);
  assert.equal(odd.srcSet, "/a%20b%2Cc-640w.webp 640w, /a%20b%2Cc.webp 900w");
});

test("fileFor picks the narrowest file wide enough, else the widest", () => {
  const image = resolved(full, [small, mid]);
  assert.equal(fileFor(image, 384).src, small.src);
  assert.equal(fileFor(image, 640).src, small.src);
  assert.equal(fileFor(image, 700).src, mid.src);
  assert.equal(fileFor(image, 2000).src, full.src);
});
