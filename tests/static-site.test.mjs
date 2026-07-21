import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("builds a GitHub Pages-ready static site", () => {
  assert.equal(existsSync("docs/index.html"), true);
  assert.equal(existsSync("docs/mascot-mochisura-bear.png"), true);
  assert.equal(existsSync("docs/mascot-mochisura-bear-hood-01.png"), true);
  assert.equal(existsSync("docs/og-mochisura.png"), true);
  assert.equal(existsSync("docs/lpmaker-icon.png"), true);
  assert.equal(existsSync("docs/site.webmanifest"), true);
  assert.equal(existsSync("docs/.nojekyll"), true);
  assert.equal(existsSync("docs/examples/index.html"), true);
  assert.equal(existsSync("docs/examples/common.css"), true);
  assert.equal(existsSync("docs/examples/bakery/index.html"), true);
  assert.equal(existsSync("docs/examples/b2b/index.html"), true);
  assert.equal(existsSync("docs/examples/workshop/index.html"), true);
  assert.equal(existsSync("docs/examples/aroma/index.html"), true);

  const html = readFileSync("docs/index.html", "utf8");
  assert.match(html, /<title>LPmaker/);
  assert.match(html, /lpmaker-icon\.png/);
  assert.match(html, /og-mochisura\.png/);
  assert.match(html, /\/LP_codex_000\/assets\//);

  const appSource = readFileSync("src/App.tsx", "utf8");
  assert.match(appSource, /mascot-mochisura-bear-hood-01\.png/);
  assert.match(appSource, /完成までの、5つのステップ/);
  assert.match(appSource, /GitHubって、なに/);
  assert.match(appSource, /設計図づくりをはじめる/);
  assert.match(appSource, /全体の流れ/);
  assert.match(appSource, /forbiddenPlatforms/);
  assert.match(appSource, /ChatGPT Sites、OpenAI Sites/);
  assert.match(appSource, /http:\/\/localhost:8000\/index\.html/);
  assert.match(appSource, /利用前の悩み/);
  assert.match(appSource, /掲載できる安心材料/);
  assert.match(appSource, /infer-with-codex/);
  assert.match(appSource, /商品情報からAIにおまかせ/);
  assert.match(appSource, /推測した内容は制作上の仮説/);
  assert.match(appSource, /CODEX_SKILLSET\.md/);
  assert.match(appSource, /CODEX_START_PROMPT\.txt/);
  assert.match(appSource, /制作ルールをセット/);
  assert.match(appSource, /LP制作を開始してください/);
  assert.match(appSource, /店舗・SNS・外部リンク/);
  assert.match(appSource, /externalLinks/);
  assert.match(appSource, /地図・アクセス/);
  assert.match(appSource, /4つの完成作例を見る/);
});
