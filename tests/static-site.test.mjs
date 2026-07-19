import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("builds a GitHub Pages-ready static site", () => {
  assert.equal(existsSync("docs/index.html"), true);
  assert.equal(existsSync("docs/mascot-mochisura-bear.png"), true);
  assert.equal(existsSync("docs/.nojekyll"), true);

  const html = readFileSync("docs/index.html", "utf8");
  assert.match(html, /<title>LPmaker/);
  assert.match(html, /\/LP_codex_000\/assets\//);
});
