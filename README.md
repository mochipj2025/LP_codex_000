# LPmaker

LP制作に必要な情報を選択式で入力し、Codexが読み取れる制作プロジェクトをZIPで書き出すWebツールです。

## 公開URL

https://mochipj2025.github.io/LP_codex_000/

## ローカル起動

```bash
npm install
npm run dev
```

## GitHub Pages更新

```bash
npm test
git add .
git commit -m "Update LPmaker"
git push
```

`npm test` が `docs/index.html` を含む公開用ファイルを生成します。GitHub Pagesは `main` ブランチの `/docs` を公開元として使用します。
