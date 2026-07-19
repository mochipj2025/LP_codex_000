"use client";

import { useEffect, useMemo, useState } from "react";
import "./style.css";

type ProjectData = {
  repositoryUrl: string;
  projectName: string;
  brandName: string;
  offeringType: string;
  offering: string;
  audienceTypes: string[];
  audience: string;
  goalType: string;
  goal: string;
  problemTypes: string[];
  problems: string;
  benefitTypes: string[];
  benefits: string;
  proofTypes: string[];
  proof: string;
  offerTypes: string[];
  offer: string;
  ctaType: string;
  ctaLabel: string;
  ctaUrl: string;
  noteTypes: string[];
  notes: string;
  lpType: string;
  mood: string;
};

const initialData: ProjectData = {
  repositoryUrl: "",
  projectName: "",
  brandName: "",
  offeringType: "",
  offering: "",
  audienceTypes: [],
  audience: "",
  goalType: "",
  goal: "",
  problemTypes: [],
  problems: "",
  benefitTypes: [],
  benefits: "",
  proofTypes: [],
  proof: "",
  offerTypes: [],
  offer: "",
  ctaType: "",
  ctaLabel: "",
  ctaUrl: "",
  noteTypes: [],
  notes: "",
  lpType: "conversion",
  mood: "trust",
};

type QuestionOption = { id: string; label: string; help?: string };

const offeringOptions: QuestionOption[] = [
  { id: "service", label: "サービス", help: "コンサル・代行・制作など" },
  { id: "product", label: "商品", help: "物販・食品・店舗商品など" },
  { id: "saas", label: "Web・SaaS", help: "アプリ・システム・会員制" },
  { id: "event", label: "イベント", help: "セミナー・説明会・体験会" },
  { id: "recruit", label: "採用・募集", help: "求人・パートナー募集" },
  { id: "other", label: "その他" },
];

const audienceOptions: QuestionOption[] = [
  { id: "business-owner", label: "経営者・事業責任者" },
  { id: "marketer", label: "広報・マーケ担当者" },
  { id: "individual", label: "個人のお客さま" },
  { id: "existing", label: "既存のお客さま" },
  { id: "candidate", label: "求職者・応募者" },
  { id: "participant", label: "イベント参加者" },
  { id: "other", label: "その他" },
];

const goalOptions: QuestionOption[] = [
  { id: "inquiry", label: "問い合わせを増やす" },
  { id: "purchase", label: "購入につなげる" },
  { id: "booking", label: "予約を増やす" },
  { id: "download", label: "資料請求を増やす" },
  { id: "signup", label: "登録・申込みを増やす" },
  { id: "recruit", label: "応募を増やす" },
  { id: "awareness", label: "認知・理解を深める" },
];

const problemOptions: QuestionOption[] = [
  { id: "unknown", label: "魅力が伝わっていない" },
  { id: "leads", label: "集客・問い合わせが少ない" },
  { id: "trust", label: "安心材料が足りない" },
  { id: "compare", label: "他社との違いが曖昧" },
  { id: "complex", label: "内容が複雑で伝わりにくい" },
  { id: "action", label: "見られるが行動されない" },
  { id: "other", label: "その他" },
];

const benefitOptions: QuestionOption[] = [
  { id: "time", label: "時間・手間を減らせる" },
  { id: "result", label: "成果を高められる" },
  { id: "clarity", label: "判断しやすくなる" },
  { id: "safe", label: "安心して進められる" },
  { id: "skill", label: "知識・スキルが身につく" },
  { id: "experience", label: "心地よい体験が得られる" },
  { id: "other", label: "その他" },
];

const proofOptions: QuestionOption[] = [
  { id: "cases", label: "導入・制作事例がある" },
  { id: "voices", label: "お客さまの声がある" },
  { id: "numbers", label: "実績を示す数字がある" },
  { id: "license", label: "資格・受賞歴がある" },
  { id: "media", label: "メディア掲載がある" },
  { id: "none", label: "まだ用意できていない" },
];

const offerOptions: QuestionOption[] = [
  { id: "consultation", label: "無料相談" },
  { id: "trial", label: "無料体験・お試し" },
  { id: "download", label: "無料資料・特典" },
  { id: "discount", label: "期間限定キャンペーン" },
  { id: "price", label: "料金プランを掲載" },
  { id: "none", label: "特別なオファーはない" },
];

const ctaOptions: QuestionOption[] = [
  { id: "consult", label: "無料相談を予約する" },
  { id: "contact", label: "問い合わせる" },
  { id: "buy", label: "購入する" },
  { id: "reserve", label: "予約・申込みをする" },
  { id: "download", label: "資料をダウンロードする" },
  { id: "apply", label: "応募する" },
  { id: "other", label: "その他" },
];

const noteOptions: QuestionOption[] = [
  { id: "short", label: "文章は短め" },
  { id: "visual", label: "画像を多めに" },
  { id: "price", label: "料金を目立たせたい" },
  { id: "faq", label: "FAQを充実させたい" },
  { id: "mobile", label: "スマホを特に重視" },
  { id: "leave", label: "構成はおまかせ" },
];

const lpTypes = [
  {
    id: "conversion",
    number: "01",
    title: "成果直結型",
    description: "悩みから解決策へ導き、問い合わせや購入を後押し。",
    structure: ["課題提起", "価値提案", "実績・根拠", "CTA"],
  },
  {
    id: "story",
    number: "02",
    title: "ストーリー型",
    description: "背景や思想を丁寧に伝え、共感と信頼を育てる。",
    structure: ["原点", "課題", "変化", "未来"],
  },
  {
    id: "service",
    number: "03",
    title: "サービス紹介型",
    description: "機能・特徴・料金を整理して、比較検討を助ける。",
    structure: ["概要", "特徴", "利用の流れ", "料金"],
  },
  {
    id: "event",
    number: "04",
    title: "イベント・募集型",
    description: "日時や対象を明快に示し、申込みまで短くつなぐ。",
    structure: ["開催概要", "得られること", "登壇者", "申込み"],
  },
];

const moods = [
  {
    id: "trust",
    title: "静かな信頼",
    description: "誠実・知的・安心感",
    colors: ["#4A3028", "#FFF4D6", "#98D5F7"],
    direction: "やわらかなクリーム色に水色を効かせ、ブラウンで信頼感を整える親しみやすいデザイン",
  },
  {
    id: "bold",
    title: "大胆・前向き",
    description: "力強い・行動的・鮮明",
    colors: ["#4A3028", "#FFAE3D", "#82C9F4"],
    direction: "フードのオレンジを大きく使い、水色とのコントラストで行動を生むデザイン",
  },
  {
    id: "warm",
    title: "親しみ・温かさ",
    description: "やさしい・人間的・身近",
    colors: ["#7A4935", "#FFF2D2", "#FFB8B2"],
    direction: "丸みのある要素と頬のピンク、温かなクリーム色で距離の近さを感じるデザイン",
  },
  {
    id: "premium",
    title: "上質・洗練",
    description: "品格・余韻・特別感",
    colors: ["#3C2925", "#E89A2F", "#FFF7E7"],
    direction: "深いブラウンと落ち着いた琥珀色、繊細な文字組みで上質さを伝えるデザイン",
  },
  {
    id: "minimal",
    title: "軽快・ミニマル",
    description: "明快・現代的・効率的",
    colors: ["#429ED8", "#E5F5FF", "#FFAA3C"],
    direction: "澄んだ水色と明瞭な情報階層に、オレンジを小さく効かせた軽快なデザイン",
  },
];

const steps = ["掲載情報", "LPの型", "雰囲気", "確認・出力"];

function labelsFor(value: string | string[], options: QuestionOption[]) {
  const ids = Array.isArray(value) ? value : value ? [value] : [];
  return ids.map((id) => options.find((option) => option.id === id)?.label).filter(Boolean) as string[];
}

function answerText(value: string | string[], options: QuestionOption[], details: string) {
  const selected = labelsFor(value, options).join("、");
  const extra = details.trim();
  if (selected && extra) return `${selected}。補足：${extra}`;
  return selected || extra;
}

function SelectionQuestion({
  title,
  description,
  required = false,
  options,
  value,
  multiple = false,
  onChange,
  details,
  onDetailsChange,
  placeholder,
}: {
  title: string;
  description?: string;
  required?: boolean;
  options: QuestionOption[];
  value: string | string[];
  multiple?: boolean;
  onChange: (value: string | string[]) => void;
  details: string;
  onDetailsChange: (value: string) => void;
  placeholder: string;
}) {
  function select(id: string) {
    if (!multiple) {
      onChange(id);
      return;
    }
    const current = Array.isArray(value) ? value : [];
    onChange(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <fieldset className="selection-question">
      <legend>{title}{required && <em>必須</em>}</legend>
      <span className="selection-mode">{multiple ? "いくつでも選べます" : "1つ選んでください"}</span>
      {description && <p className="question-help">{description}</p>}
      <div className="answer-chips">
        {options.map((option) => {
          const selected = Array.isArray(value) ? value.includes(option.id) : value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              className={selected ? "selected" : ""}
              onClick={() => select(option.id)}
            >
              <span className="chip-check">{selected ? "✓" : "+"}</span>
              <span><strong>{option.label}</strong>{option.help && <small>{option.help}</small>}</span>
            </button>
          );
        })}
      </div>
      <details className="optional-detail" open={Boolean(details)}>
        <summary>詳しく書きたい方だけ、補足を入力 <span>＋</span></summary>
        <textarea value={details} onChange={(event) => onDetailsChange(event.target.value)} placeholder={placeholder} rows={3} />
      </details>
    </fieldset>
  );
}

function normalize(value: string) {
  return value.trim() || "未指定（制作時に合理的な仮説を置き、要確認として明示）";
}

function slugify(value: string) {
  const slug = value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || `lp-project-${new Date().toISOString().slice(0, 10)}`;
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = (value & 1) !== 0 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value >>> 0;
});

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function zipDate(date: Date) {
  const year = Math.max(date.getFullYear(), 1980);
  return {
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1),
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
  };
}

function bufferOf(bytes: Uint8Array) {
  return new Uint8Array(bytes).buffer;
}

function createZip(files: Array<{ name: string; content: string }>) {
  const encoder = new TextEncoder();
  const now = zipDate(new Date());
  const localParts: ArrayBuffer[] = [];
  const centralParts: ArrayBuffer[] = [];
  let offset = 0;

  for (const file of files) {
    const name = encoder.encode(file.name);
    const data = encoder.encode(file.content);
    const crc = crc32(data);
    const local = new Uint8Array(30 + name.length);
    const localView = new DataView(local.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(6, 0x0800, true);
    localView.setUint16(8, 0, true);
    localView.setUint16(10, now.time, true);
    localView.setUint16(12, now.date, true);
    localView.setUint32(14, crc, true);
    localView.setUint32(18, data.length, true);
    localView.setUint32(22, data.length, true);
    localView.setUint16(26, name.length, true);
    local.set(name, 30);
    localParts.push(bufferOf(local), bufferOf(data));

    const central = new Uint8Array(46 + name.length);
    const centralView = new DataView(central.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(8, 0x0800, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint16(12, now.time, true);
    centralView.setUint16(14, now.date, true);
    centralView.setUint32(16, crc, true);
    centralView.setUint32(20, data.length, true);
    centralView.setUint32(24, data.length, true);
    centralView.setUint16(28, name.length, true);
    centralView.setUint32(42, offset, true);
    central.set(name, 46);
    centralParts.push(bufferOf(central));
    offset += local.length + data.length;
  }

  const centralSize = centralParts.reduce((sum, part) => sum + part.byteLength, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(8, files.length, true);
  endView.setUint16(10, files.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, offset, true);
  return new Blob([...localParts, ...centralParts, bufferOf(end)], { type: "application/zip" });
}

function buildFiles(data: ProjectData) {
  const lpType = lpTypes.find((item) => item.id === data.lpType) ?? lpTypes[0];
  const mood = moods.find((item) => item.id === data.mood) ?? moods[0];
  const offering = answerText(data.offeringType, offeringOptions, data.offering);
  const audience = answerText(data.audienceTypes, audienceOptions, data.audience);
  const goal = answerText(data.goalType, goalOptions, data.goal);
  const problems = answerText(data.problemTypes, problemOptions, data.problems);
  const benefits = answerText(data.benefitTypes, benefitOptions, data.benefits);
  const proof = answerText(data.proofTypes, proofOptions, data.proof);
  const offer = answerText(data.offerTypes, offerOptions, data.offer);
  const ctaLabel = answerText(data.ctaType, ctaOptions, data.ctaLabel);
  const notes = answerText(data.noteTypes, noteOptions, data.notes);
  const slug = slugify(data.projectName);
  const generatedAt = new Date().toISOString();
  const project = {
    schemaVersion: "1.0",
    generatedBy: "LPmaker",
    generatedAt,
    project: {
      name: normalize(data.projectName),
      slug,
      repositoryUrl: normalize(data.repositoryUrl),
      entryPoint: "index.html",
      brand: normalize(data.brandName),
      offering: normalize(offering),
      audience: normalize(audience),
      primaryGoal: normalize(goal),
      cta: { label: normalize(ctaLabel), url: normalize(data.ctaUrl) },
    },
    content: {
      customerProblems: normalize(problems),
      benefits: normalize(benefits),
      proof: normalize(proof),
      offer: normalize(offer),
      notes: normalize(notes),
    },
    direction: {
      lpType: { id: lpType.id, name: lpType.title, recommendedSections: lpType.structure },
      mood: { id: mood.id, name: mood.title, description: mood.direction, colors: mood.colors },
    },
    delivery: {
      mode: "repository-static-site",
      previewEntry: "index.html",
      previewCommand: "python -m http.server 8000",
      forbiddenPlatforms: ["ChatGPT Sites", "*.chatgpt.site"],
      forbiddenFiles: [".openai/hosting.json"],
    },
  };

  const brief = `# ${normalize(data.projectName)} — LP制作ブリーフ

## このLPの目的
- 制作先リポジトリ: ${normalize(data.repositoryUrl)}
- 公開エントリーポイント: index.html
- 提供内容: ${normalize(offering)}
- 想定ユーザー: ${normalize(audience)}
- 最優先の成果: ${normalize(goal)}
- ブランド／運営者: ${normalize(data.brandName)}

## 顧客理解
### 抱えている悩み
${normalize(problems)}

### 提供できる変化・便益
${normalize(benefits)}

### 信頼の根拠
${normalize(proof)}

### オファー・条件
${normalize(offer)}

## CTA
- ラベル: ${normalize(ctaLabel)}
- 遷移先: ${normalize(data.ctaUrl)}

## 構成方針
- 型: ${lpType.title}
- 推奨セクション: ${lpType.structure.join(" → ")}
- 狙い: ${lpType.description}

## ビジュアル方針
- 雰囲気: ${mood.title}（${mood.description}）
- 方向性: ${mood.direction}
- 基準色: ${mood.colors.join(" / ")}

## 補足
${normalize(notes)}
`;

  const agents = `# AGENTS.md

## Mission
このフォルダの情報を一次情報として、project.json に記載された個別リポジトリへ公開可能なランディングページを実装する。

## Repository workflow
- project.json の repositoryUrl を制作先として使う。
- リポジトリが手元にない場合はcloneし、既に開かれている場合は現在のリポジトリを確認して使う。
- リポジトリ直下の index.html を公開入口にする。
- CSS・JavaScript・画像は相対パスで参照し、静的ホスティングで表示できる構成にする。
- 完成後は変更をcommitし、指定リポジトリへpushする。

## Non-negotiable delivery rules
- ChatGPT Sites、OpenAI Sites、または *.chatgpt.site へ公開しない。
- .openai/hosting.json を作成せず、Sites用の初期化・ビルド・デプロイを実行しない。
- プレビュー入口は必ずリポジトリ直下の index.html とする。
- index.html からCSS・JavaScript・画像を相対パスで読み込み、特定サービスのURLへ依存させない。
- プレビュー時はリポジトリ直下で \`python -m http.server 8000\` を実行し、\`http://localhost:8000/index.html\` を開く。
- フレームワークを使う場合も、最終成果物としてルートの index.html から確認できる静的ファイルを用意する。

## Source of truth
1. project.json — 機械可読な確定情報
2. BRIEF.md — 制作意図と優先順位
3. content/COPY.md — 掲載文言の材料
4. assets/IMAGE_BRIEF.md — 画像の生成・選定方針

## Implementation rules
- project.json の明示情報を勝手に変更しない。
- 「未指定」と記載された項目は、ターゲットと目的から合理的な案を置いてよい。ただし事実・実績・価格・固有名詞を捏造しない。
- ファーストビューで「誰の、何のための、どんな提供か」を理解できるようにする。
- 選択されたLP型を基本に、重複を避けてセクションを構成する。
- 選択された雰囲気は色だけでなく、余白、文字組み、写真、動きにも反映する。
- モバイルを含むレスポンシブ、キーボード操作、十分なコントラストを確認する。
- 必要な画像は IMAGE_BRIEF.md に沿って生成または選定し、適切な代替テキストを付ける。
- 実装後にリンク、CTA、表示崩れ、ビルドを確認する。
`;

  const copy = `# 掲載コピー素材

## 商品・サービス
${normalize(offering)}

## 想定する読み手
${normalize(audience)}

## 悩み・障壁
${normalize(problems)}

## 得られる変化
${normalize(benefits)}

## 実績・証拠・安心材料
${normalize(proof)}

## 提供条件
${normalize(offer)}

## 行動喚起
${normalize(ctaLabel)} — ${normalize(data.ctaUrl)}

## その他の要望
${normalize(notes)}
`;

  const imageBrief = `# 画像制作・選定指示

## トーン
${mood.direction}

## カラーパレット
${mood.colors.join(" / ")}

## 必要画像の判断
- 装飾目的だけの画像は増やさず、理解・信頼・感情のいずれかに寄与する画像のみ使う。
- 商品や人物の実在写真が必要で支給がない場合、架空の実績に見えない表現を選ぶ。
- AI生成する場合は、ブランドとターゲットに合う一貫した光、色、画角で揃える。
- 画像内に可読性が重要な文字を生成しない。文字はHTMLで重ねる。
- WebPまたはAVIFを優先し、表示サイズに合わせて圧縮する。

## 候補
- ファーストビュー: ${normalize(offering)} の価値が一目で伝わる主役ビジュアル
- 課題／便益セクション: ${normalize(audience)} が自分ごと化できる利用場面
- 信頼セクション: ${normalize(proof)} を補強する実物・工程・人物（事実確認できる場合のみ）
`;

  const readme = `# ${normalize(data.projectName)}

LPmakerから書き出されたLP制作プロジェクトです。

## 制作先
- リポジトリ: ${normalize(data.repositoryUrl)}
- 公開入口: index.html
- プレビュー: リポジトリ直下で \`python -m http.server 8000\` → \`http://localhost:8000/index.html\`
- 使用禁止: ChatGPT Sites / OpenAI Sites / *.chatgpt.site

## Codexへの依頼文
「このフォルダの AGENTS.md と project.json を先に読んでください。project.json の repositoryUrl にある個別リポジトリへ、BRIEF.md に沿ったLPを実装してください。ChatGPT Sites・OpenAI Sites・*.chatgpt.site は使わず、.openai/hosting.json も作成しないでください。入口はリポジトリ直下の index.html にし、相対パスで動く静的サイトとして制作してください。リポジトリ直下で python -m http.server 8000 を実行し、http://localhost:8000/index.html でプレビューしてください。必要な画像は assets/IMAGE_BRIEF.md を参照して生成・配置し、最後に表示とCTAを確認してcommit・pushしてください。」

## フォルダ構成
- project.json: 確定情報と制作方針
- BRIEF.md: 人が読みやすい制作ブリーフ
- AGENTS.md: Codex向け実装ルール
- content/COPY.md: コピー素材
- assets/IMAGE_BRIEF.md: 画像の指示
`;

  return {
    slug,
    files: [
      { name: `${slug}/project.json`, content: JSON.stringify(project, null, 2) },
      { name: `${slug}/BRIEF.md`, content: brief },
      { name: `${slug}/AGENTS.md`, content: agents },
      { name: `${slug}/README.md`, content: readme },
      { name: `${slug}/content/COPY.md`, content: copy },
      { name: `${slug}/assets/IMAGE_BRIEF.md`, content: imageBrief },
    ],
  };
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ProjectData>(initialData);
  const [saved, setSaved] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [instructionCopied, setInstructionCopied] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("lpmaker-draft-v1");
    if (stored) {
      try {
        setData({ ...initialData, ...JSON.parse(stored) });
      } catch {
        window.localStorage.removeItem("lpmaker-draft-v1");
      }
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.localStorage.setItem("lpmaker-draft-v1", JSON.stringify(data));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1200);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [data]);

  const required = useMemo(
    () => [
      ["個別リポジトリURL", data.repositoryUrl],
      ["プロジェクト名", data.projectName],
      ["商品・サービス", answerText(data.offeringType, offeringOptions, data.offering)],
      ["想定ユーザー", answerText(data.audienceTypes, audienceOptions, data.audience)],
      ["LPのゴール", answerText(data.goalType, goalOptions, data.goal)],
      ["CTA", answerText(data.ctaType, ctaOptions, data.ctaLabel)],
    ].filter(([, value]) => !value.trim()),
    [data],
  );

  const type = lpTypes.find((item) => item.id === data.lpType) ?? lpTypes[0];
  const mood = moods.find((item) => item.id === data.mood) ?? moods[0];
  const offeringAnswer = answerText(data.offeringType, offeringOptions, data.offering);
  const audienceAnswer = answerText(data.audienceTypes, audienceOptions, data.audience);
  const goalAnswer = answerText(data.goalType, goalOptions, data.goal);
  const ctaAnswer = answerText(data.ctaType, ctaOptions, data.ctaLabel);

  function update<K extends keyof ProjectData>(key: K, value: ProjectData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    setDownloaded(false);
  }

  function downloadProject() {
    if (required.length > 0) return;
    const output = buildFiles(data);
    const blob = createZip(output.files);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${output.slug}-lpmaker.zip`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }

  function resetDraft() {
    if (!window.confirm("入力内容をすべて消して、最初から始めますか？")) return;
    setData(initialData);
    setStep(0);
    setDownloaded(false);
    window.localStorage.removeItem("lpmaker-draft-v1");
  }

  async function copyCodexInstruction() {
    const instruction = "このフォルダの AGENTS.md と project.json を先に読んでください。project.json の repositoryUrl にある個別リポジトリへ、BRIEF.md に沿ったLPを実装してください。ChatGPT Sites・OpenAI Sites・*.chatgpt.site は使わず、.openai/hosting.json も作成しないでください。入口はリポジトリ直下の index.html にし、相対パスで動く静的サイトとして制作してください。リポジトリ直下で python -m http.server 8000 を実行し、http://localhost:8000/index.html でプレビューしてください。必要な画像は assets/IMAGE_BRIEF.md を参照して生成・配置し、最後に表示とCTAを確認してcommit・pushしてください。";
    await navigator.clipboard.writeText(instruction);
    setInstructionCopied(true);
    window.setTimeout(() => setInstructionCopied(false), 1800);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div>
          <a className="brand" href="#top" aria-label="LPmaker ホーム">
            <span className="brand-mark">L</span>
            <span>LPmaker</span>
          </a>
          <div className="mascot-card">
            <img src={`${import.meta.env.BASE_URL}mascot-mochisura-bear.png`} alt="くまのフードをかぶった、もちすらのマスコット" />
            <span>選ぶだけで<br />LPの設計図が完成！</span>
          </div>
          <p className="sidebar-copy">むずかしい文章は不要。詳しく伝えたいところだけ、あとから補足できます。</p>
        </div>

        <nav className="step-nav" aria-label="入力ステップ">
          {steps.map((label, index) => (
            <button
              className={`step-link ${step === index ? "active" : ""} ${step > index ? "done" : ""}`}
              key={label}
              onClick={() => setStep(index)}
              type="button"
              aria-current={step === index ? "step" : undefined}
            >
              <span>{step > index ? "✓" : String(index + 1).padStart(2, "0")}</span>
              <strong>{label}</strong>
            </button>
          ))}
        </nav>

        <div className="sidebar-foot">
          <p><span className="status-dot" /> 端末内に自動保存</p>
          <button type="button" onClick={resetDraft}>入力をリセット</button>
        </div>
      </aside>

      <section className="workspace" id="top">
        <header className="topbar">
          <div>
            <span className="eyebrow">STEP {String(step + 1).padStart(2, "0")} / 04</span>
            <div className="progress" aria-label={`進捗 ${Math.round(((step + 1) / 4) * 100)}%`}>
              <span style={{ width: `${((step + 1) / 4) * 100}%` }} />
            </div>
          </div>
          <span className={`save-status ${saved ? "visible" : ""}`}>保存しました</span>
        </header>

        <div className="content-wrap">
          {step === 0 && (
            <div className="stage">
              <div className="stage-heading">
                <span className="kicker">まず、素材を集める</span>
                <h1>近い答えを、<br />選んでください。</h1>
                <p>先にこのLP専用の空リポジトリを用意し、そのURLを登録します。その後は選択肢から選ぶだけで、Codexが読み取れる設計図に整います。</p>
              </div>

              <section className="repo-setup" aria-labelledby="repo-setup-title">
                <div className="repo-setup-number">準備</div>
                <div className="repo-setup-copy">
                  <span className="review-label">BEFORE INPUT</span>
                  <h2 id="repo-setup-title">このLP専用のリポジトリを先に用意します。</h2>
                  <p>GitHubなどで空のリポジトリを1つ作り、取得したURLを貼り付けてください。CodexはこのURLを制作先として使い、リポジトリ直下の index.html を公開入口にします。</p>
                  <div className="static-output-note">
                    <span><strong>制作先</strong> 個別リポジトリ</span>
                    <span><strong>プレビュー</strong> index.html</span>
                    <span><strong>使用しない</strong> ChatGPT Sites</span>
                  </div>
                  <ol>
                    <li>新しい空のリポジトリを作る</li>
                    <li>リポジトリのURLをコピーする</li>
                    <li>下の入力欄へ貼り付ける</li>
                  </ol>
                  <label>個別リポジトリURL <em>必須</em><small>例：GitHubリポジトリのHTTPS URL</small>
                    <input value={data.repositoryUrl} onChange={(e) => update("repositoryUrl", e.target.value)} placeholder="https://github.com/ユーザー名/lp-project.git" inputMode="url" />
                  </label>
                </div>
              </section>

              <div className="form-card">
                <div className="section-title">
                  <span>01</span>
                  <div><h2>LPの基本情報</h2><p>当てはまるものを選ぶだけで大丈夫です</p></div>
                </div>
                <div className="form-grid two-cols">
                  <label>プロジェクト名 <em>必須</em><small>このLPを見分けるための名前です。仮の名前でも大丈夫です。</small>
                    <input value={data.projectName} onChange={(e) => update("projectName", e.target.value)} placeholder="例：新サービス紹介LP" />
                  </label>
                  <label>ブランド・運営者名<small>LPに掲載する会社名・屋号・サービス名を入力します。</small>
                    <input value={data.brandName} onChange={(e) => update("brandName", e.target.value)} placeholder="例：株式会社○○" />
                  </label>
                </div>
                <SelectionQuestion
                  title="何を紹介するLPですか？"
                  description="売りたい商品や、知ってほしいサービスにいちばん近いものを選びます。"
                  required
                  options={offeringOptions}
                  value={data.offeringType}
                  onChange={(value) => update("offeringType", value as string)}
                  details={data.offering}
                  onDetailsChange={(value) => update("offering", value)}
                  placeholder="商品名、サービスの特徴、プラン内容など"
                />
                <SelectionQuestion
                  title="主に誰へ届けますか？"
                  description="このLPをいちばん読んでほしい相手を選びます。迷う場合は複数でも大丈夫です。"
                  required
                  multiple
                  options={audienceOptions}
                  value={data.audienceTypes}
                  onChange={(value) => update("audienceTypes", value as string[])}
                  details={data.audience}
                  onDetailsChange={(value) => update("audience", value)}
                  placeholder="年齢、業種、役職、今の状況など"
                />
                <SelectionQuestion
                  title="このLPで一番達成したいことは？"
                  description="読んだ人に最終的にしてほしい行動を、最優先のものから1つ選びます。"
                  required
                  options={goalOptions}
                  value={data.goalType}
                  onChange={(value) => update("goalType", value as string)}
                  details={data.goal}
                  onDetailsChange={(value) => update("goal", value)}
                  placeholder="目標件数や特に重視したいことなど"
                />
              </div>

              <div className="form-card">
                <div className="section-title">
                  <span>02</span>
                  <div><h2>伝えたい内容</h2><p>複数選択できます。補足は任意です</p></div>
                </div>
                <SelectionQuestion title="ユーザーは何に困っていますか？" description="商品・サービスを探すきっかけになる悩みを選びます。" multiple options={problemOptions} value={data.problemTypes} onChange={(value) => update("problemTypes", value as string[])} details={data.problems} onDetailsChange={(value) => update("problems", value)} placeholder="具体的な悩み、よく聞く相談、困る場面など" />
                <SelectionQuestion title="利用すると、どんな良い変化がありますか？" description="購入後・利用後に得られる結果や気持ちを選びます。" multiple options={benefitOptions} value={data.benefitTypes} onChange={(value) => update("benefitTypes", value as string[])} details={data.benefits} onDetailsChange={(value) => update("benefits", value)} placeholder="利用前と利用後の違い、得られる成果など" />
                <SelectionQuestion title="信頼につながる材料はありますか？" description="安心して選んでもらうために、実際に掲載できる根拠を選びます。" multiple options={proofOptions} value={data.proofTypes} onChange={(value) => update("proofTypes", value as string[])} details={data.proof} onDetailsChange={(value) => update("proof", value)} placeholder="実績数、具体的な事例、資格名、掲載メディアなど" />
                <SelectionQuestion title="用意しているオファーはありますか？" description="読んだ人が最初の一歩を踏み出しやすくなる提案を選びます。" multiple options={offerOptions} value={data.offerTypes} onChange={(value) => update("offerTypes", value as string[])} details={data.offer} onDetailsChange={(value) => update("offer", value)} placeholder="料金、特典、期限、対象条件など" />
              </div>

              <div className="form-card">
                <div className="section-title">
                  <span>03</span>
                  <div><h2>行動喚起と仕上げ</h2><p>ボタンの内容と追加の希望を選択</p></div>
                </div>
                <SelectionQuestion title="最後にどの行動をしてほしいですか？" description="LPのいちばん大切なボタンに表示する行動を選びます。" required options={ctaOptions} value={data.ctaType} onChange={(value) => update("ctaType", value as string)} details={data.ctaLabel} onDetailsChange={(value) => update("ctaLabel", value)} placeholder="独自のボタン文言があれば入力" />
                <SelectionQuestion title="仕上がりへの希望はありますか？" description="文章量や見せ方について、Codexに優先してほしい条件を選びます。" multiple options={noteOptions} value={data.noteTypes} onChange={(value) => update("noteTypes", value as string[])} details={data.notes} onDetailsChange={(value) => update("notes", value)} placeholder="避けたい表現、必ず載せたい事項、参考サイトなど" />
                <div className="form-grid">
                  <label className="wide">ボタンの遷移先URL <span className="optional-label">任意</span><small>問い合わせフォームや予約ページなど、ボタンを押した後に開くページです。</small>
                    <input value={data.ctaUrl} onChange={(e) => update("ctaUrl", e.target.value)} placeholder="https://example.com/contact" inputMode="url" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="stage compact-stage">
              <div className="stage-heading">
                <span className="kicker">情報の見せ方を決める</span>
                <h1>LPの型を<br />選びましょう。</h1>
                <p>目的に最も近いものを1つ選択してください。Codexはこの型を起点に、内容に合う順番へ調整します。</p>
              </div>
              <div className="choice-grid type-grid" role="radiogroup" aria-label="LPの型">
                {lpTypes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={data.lpType === item.id}
                    className={`choice-card ${data.lpType === item.id ? "selected" : ""}`}
                    onClick={() => update("lpType", item.id)}
                  >
                    <div className="choice-top"><span>{item.number}</span><i /></div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <ol>{item.structure.map((part) => <li key={part}>{part}</li>)}</ol>
                  </button>
                ))}
              </div>
              <div className="selection-note"><strong>選択中：{type.title}</strong><span>{type.structure.join(" → ")}</span></div>
            </div>
          )}

          {step === 2 && (
            <div className="stage compact-stage">
              <div className="stage-heading">
                <span className="kicker">見た目の方向を決める</span>
                <h1>どんな雰囲気で<br />伝えますか？</h1>
                <p>選んだ印象を、配色・余白・文字組み・画像のトーンまで含めた制作指示に変換します。</p>
              </div>
              <div className="mood-list" role="radiogroup" aria-label="LPの雰囲気">
                {moods.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={data.mood === item.id}
                    className={`mood-card ${data.mood === item.id ? "selected" : ""}`}
                    onClick={() => update("mood", item.id)}
                  >
                    <span className="mood-number">{String(index + 1).padStart(2, "0")}</span>
                    <div className="swatches" aria-hidden="true">{item.colors.map((color) => <i key={color} style={{ background: color }} />)}</div>
                    <div className="mood-copy"><h2>{item.title}</h2><p>{item.description}</p></div>
                    <span className="select-ring" />
                  </button>
                ))}
              </div>
              <div className="direction-preview">
                <span>DESIGN DIRECTION</span>
                <p>{mood.direction}</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="stage compact-stage review-stage">
              <div className="stage-heading">
                <span className="kicker">Codexへ渡す準備ができました</span>
                <h1>確認して、<br />書き出しましょう。</h1>
                <p>ZIPには入力データ、制作ブリーフ、コピー素材、画像指示、Codex向けルールが含まれます。</p>
              </div>

              <div className="review-layout">
                <div className="review-card primary-review">
                  <span className="review-label">PROJECT</span>
                  <h2>{data.projectName || "名称未入力のプロジェクト"}</h2>
                  <p>{offeringAnswer || "商品・サービスがまだ選択されていません。"}</p>
                  <dl>
                    <div><dt>制作先</dt><dd>{data.repositoryUrl || "未入力"}</dd></div>
                    <div><dt>想定ユーザー</dt><dd>{audienceAnswer || "未選択"}</dd></div>
                    <div><dt>ゴール</dt><dd>{goalAnswer || "未選択"}</dd></div>
                    <div><dt>CTA</dt><dd>{ctaAnswer || "未選択"}</dd></div>
                  </dl>
                </div>
                <div className="review-card direction-card">
                  <span className="review-label">DIRECTION</span>
                  <div><small>LPの型</small><h3>{type.title}</h3><p>{type.structure.join(" → ")}</p></div>
                  <div><small>雰囲気</small><h3>{mood.title}</h3><div className="mini-swatches">{mood.colors.map((color) => <i key={color} style={{ background: color }} />)}</div></div>
                </div>
              </div>

              <div className={`export-panel ${required.length > 0 ? "has-errors" : ""}`}>
                <div className="file-stack" aria-hidden="true"><span /><span /><span>ZIP</span></div>
                <div className="export-copy">
                  <span className="review-label">EXPORT PROJECT</span>
                  <h2>{required.length > 0 ? `あと${required.length}項目で書き出せます` : "プロジェクトフォルダを書き出す"}</h2>
                  {required.length > 0 ? (
                    <p>未入力：{required.map(([label]) => label).join("、")}</p>
                  ) : (
                    <p>6ファイルをまとめたZIPをこの端末に保存します。入力内容は外部へ送信されません。</p>
                  )}
                </div>
                <button className="download-button" type="button" disabled={required.length > 0} onClick={downloadProject}>
                  {downloaded ? "もう一度ダウンロード" : "ZIPを書き出す"}<span>↓</span>
                </button>
              </div>

              <section className="after-export" aria-labelledby="after-export-title">
                <div className="after-export-heading">
                  <span className="review-label">AFTER EXPORT</span>
                  <h2 id="after-export-title">ZIPができたら、次はこの3ステップです。</h2>
                  <p>ZIPの中には、個別リポジトリのURLとCodexがLPを制作するために必要な情報がひとまとめになっています。</p>
                </div>
                <ol className="after-export-steps">
                  <li><span>1</span><div><strong>ZIPを展開する</strong><p>ダウンロードしたZIPを右クリックし、「すべて展開」を選びます。ZIPのままではなく、展開後のフォルダを使います。</p></div></li>
                  <li><span>2</span><div><strong>設計図をCodexで開く</strong><p>展開したフォルダをCodexで開きます。制作先リポジトリのURLは project.json に保存済みです。</p></div></li>
                  <li><span>3</span><div><strong>index.htmlでプレビュー</strong><p>Codexが個別リポジトリへLPを実装し、ローカルの index.html を表示確認してからcommit・pushします。</p></div></li>
                </ol>
                <div className="codex-instruction">
                  <p>このフォルダの AGENTS.md と project.json を先に読んでください。project.json の repositoryUrl にある個別リポジトリへ、BRIEF.md に沿ったLPを実装してください。ChatGPT Sites・OpenAI Sites・*.chatgpt.site は使わず、.openai/hosting.json も作成しないでください。入口はリポジトリ直下の index.html にし、相対パスで動く静的サイトとして制作してください。リポジトリ直下で python -m http.server 8000 を実行し、http://localhost:8000/index.html でプレビューしてください。必要な画像は assets/IMAGE_BRIEF.md を参照して生成・配置し、最後に表示とCTAを確認してcommit・pushしてください。</p>
                  <button type="button" onClick={copyCodexInstruction}>{instructionCopied ? "コピーしました" : "依頼文をコピー"}</button>
                </div>
              </section>

              {downloaded && (
                <div className="success-message" role="status">
                  <strong>書き出しが完了しました。</strong>
                  <span>上の3ステップに沿って、ZIPを展開してCodexで開いてください。</span>
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="actionbar">
          <button className="back-button" type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>← 戻る</button>
          <span>{step < 3 ? `${steps[step]}を確認中` : required.length === 0 ? "書き出し可能" : `必須項目 ${required.length}件が未入力`}</span>
          {step < 3 && <button className="next-button" type="button" onClick={() => setStep((current) => Math.min(3, current + 1))}>次へ進む <span>→</span></button>}
        </footer>
      </section>
    </main>
  );
}
