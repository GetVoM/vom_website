/**
 * The tools catalogue against the URL contract: every path must be a `keep` row
 * of docs/content/url-map.csv, byte for byte, and every tool row must be served.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { toolIds, toolPath, tools, toolsIndex } from "./catalogue.ts";

const csv = readFileSync(join(import.meta.dirname, "../../../docs/content/url-map.csv"), "utf8");
const toolRows = csv
  .split("\n")
  .filter((line) => line.startsWith("tool,"))
  .map((line) => {
    const [, , path, , action] = line.split(",");
    return { path, action };
  });

test("every catalogue path is a keep row of the URL contract", () => {
  const keep = new Set(toolRows.filter((row) => row.action === "keep").map((row) => row.path));
  for (const path of [toolsIndex.path, ...toolIds.map(toolPath)]) assert.ok(keep.has(path), `${path} is not a keep row`);
});

test("every tool row of the URL contract is served", () => {
  const served = new Set([toolsIndex.path, ...toolIds.map(toolPath)]);
  for (const row of toolRows) assert.ok(served.has(row.path), `${row.path} is not in the catalogue`);
});

test("ids and slugs are unique; dates are ISO", () => {
  assert.equal(new Set(toolIds).size, tools.length);
  assert.equal(new Set(tools.map((tool) => tool.slug)).size, tools.length);
  for (const tool of tools) {
    assert.ok(!Number.isNaN(Date.parse(tool.published)), tool.id);
    assert.ok(tool.modified >= tool.published, tool.id);
  }
});
