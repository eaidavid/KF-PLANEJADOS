import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { brand, environments, projects } from "../src/data/catalog.js";
import { articles } from "../src/data/articles.js";
const require = createRequire(import.meta.url);
const {
  chromium,
} = require("C:/Users/David/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const base = process.env.ART_QA_URL || "http://127.0.0.1:5173";
const axe = await readFile("qa/node_modules/axe-core/axe.min.js", "utf8");
const paths = [
  "/",
  "/ambientes",
  "/ambientes/cozinhas",
  "/sobre",
  "/blog",
  ...articles.map((a) => `/blog/${a.slug}`),
  "/orcamento",
  "/favoritos",
  "/privacidade",
  "/link-bio",
];
const audit = [];
for (const path of paths) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.addScriptTag({ content: axe });
  const result = await page.evaluate(() =>
    axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"],
      },
    }),
  );
  audit.push({
    path,
    violations: result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
    passes: result.passes.length,
  });
}
await page.goto(base, { waitUntil: "networkidle" });
for (const [label, name] of [
  ["índice aberto", "Abrir índice"],
  ["seleção aberta", /^Seleção/],
  ["detalhe ampliado", "Ampliar detalhe: Armários superiores"],
]) {
  await page.getByRole("button", { name }).click();
  await page.addScriptTag({ content: axe });
  const result = await page.evaluate(() => axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"] } }));
  audit.push({path: `/ [${label}]`, violations: result.violations.map(v => ({id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map(n => ({target: n.target, summary: n.failureSummary}))})), passes: result.passes.length});
  if (label === "detalhe ampliado") await page.getByRole("button", { name: "Fechar detalhe" }).click();
  else await page.keyboard.press("Escape");
}
const seo = [];
for (const path of [
  ...paths,
  ...environments.map((e) => `/ambientes/${e.slug}`),
  ...projects.map((p) => `/projetos/${p.id}`),
]) {
  const response = await page.request.get(base + path);
  const html = await response.text();
  seo.push({
    path,
    status: response.status(),
    h1: (html.match(/<h1[ >]/g) || []).length,
    hasCanonical: html.includes('rel="canonical"'),
    hasDescription: html.includes('name="description"'),
    hasContent: html.includes('id="conteudo"'),
    schema: html.includes("application/ld+json"),
  });
}
await page.setViewportSize({ width: 320, height: 900 });
const responsive = [];
for (const path of [
  "/",
  "/ambientes",
  "/blog",
  "/sobre",
  "/orcamento",
  "/projetos/quarto-madeira",
  "/privacidade",
  "/link-bio",
]) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  responsive.push({
    path,
    overflow: await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  });
  await page.addScriptTag({content:axe});
  const mobileResult=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22a','wcag22aa']}}));
  audit.push({path:`${path} [320 px]`,violations:mobileResult.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),passes:mobileResult.passes.length});
}
await browser.close();
const report = { base, audit, seo, responsive };
await writeFile("qa/quality.json", JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      routes: seo.length,
      violations: audit.filter((a) => a.violations.length),
      seoFailures: seo.filter(
        (s) =>
          s.status !== 200 ||
          s.h1 !== 1 ||
          !s.hasCanonical ||
          !s.hasDescription ||
          !s.hasContent ||
          !s.schema,
      ),
      responsiveFailures: responsive.filter((r) => r.overflow),
    },
    null,
    2,
  ),
);
if (
  audit.some((a) => a.violations.length) ||
  seo.some(
    (s) =>
      s.status !== 200 ||
      s.h1 !== 1 ||
      !s.hasCanonical ||
      !s.hasDescription ||
      !s.hasContent ||
      !s.schema,
  ) ||
  responsive.some((r) => r.overflow)
)
  process.exitCode = 1;
