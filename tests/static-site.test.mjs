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

  const appSource = readFileSync("src/App.tsx", "utf8");
  assert.match(appSource, /forbiddenPlatforms/);
  assert.match(appSource, /ChatGPT Sites、OpenAI Sites/);
  assert.match(appSource, /http:\/\/localhost:8000\/index\.html/);
  assert.match(appSource, /利用前の悩み/);
  assert.match(appSource, /申し込む前の不安を減らせる材料/);
});
