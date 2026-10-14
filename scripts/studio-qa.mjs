import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
const {
  chromium,
} = require("C:/Users/David/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const base = process.env.ART_QA_URL || "http://127.0.0.1:5173";
const errors = [],
  checks = [];
const motionRequests = [];
page.on("request", request => { if (/studioMotion-.*\.js/.test(request.url())) motionRequests.push(request.url()); });
await mkdir("qa", { recursive: true });
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
const verify = (condition, label) => {
  checks.push({ label, pass: !!condition });
  if (!condition) throw new Error(label);
};
const envTabs = () =>
  page.getByRole("tablist", {
    name: "Ambientes de móveis planejados",
    exact: true,
  });
const prepTabs = () =>
  page.getByRole("tablist", {
    name: "Roteiro para preparar o orçamento",
    exact: true,
  });
async function settle() {
  await page.waitForTimeout(950);
  await page.evaluate(() => document.fonts.ready);
}
try {
  await page.goto(base, { waitUntil: "networkidle" });
  verify(motionRequests.length === 0, "Motion chunk waits for visitor intent");
  await page.mouse.move(12, 80);
  await page.waitForFunction(
    () =>
      document.querySelector(".studio-home")?.dataset.motionEngine === "gsap",
  );
  verify(
    (await page.locator(".studio-home").getAttribute("data-motion-mode")) ===
      "full",
    "GSAP loads on homepage",
  );
  await page
    .getByRole("navigation", { name: "Nesta página" })
    .getByRole("link", { name: "Ambientes", exact: true })
    .click();
  await settle();
  verify(
    await page.evaluate(
      () =>
        Math.abs(
          document.querySelector("#ambientes").getBoundingClientRect().top - 72,
        ) < 4,
    ),
    "Navigation reaches section below sticky bar",
  );
  const glyph = page.locator(".environment-heading .lettering-glyph").first();
  verify(
    await glyph.evaluate(
      (e) =>
        Math.abs(new DOMMatrixReadOnly(getComputedStyle(e).transform).m42) < 1,
    ),
    "Scroll lettering reaches readable resting state",
  );
  const quartos = envTabs().getByRole("tab", { name: "Quartos", exact: true });
  await quartos.hover();
  await page.waitForTimeout(350);
  verify(
    await quartos
      .locator(".env-tab-label")
      .evaluate(
        (e) => new DOMMatrixReadOnly(getComputedStyle(e).transform).m41 > 5,
      ),
    "GSAP hover moves environment lettering",
  );
  await quartos.click();
  await settle();
  verify(
    (await quartos.getAttribute("aria-selected")) === "true",
    "Click selects environment",
  );
  verify(
    (await page.locator(".environment-photo").getAttribute("src")).includes(
      "quarto-madeira",
    ),
    "Click changes environment photograph",
  );
  verify(
    (await page
      .locator(".environment-description .studio-inline-action")
      .getAttribute("href")) === "/orcamento?ambiente=quartos",
    "Environment connects to budget URL",
  );
  await quartos.press("ArrowDown");
  await settle();
  verify(
    (await envTabs()
      .getByRole("tab", { name: "Salas", exact: true })
      .getAttribute("aria-selected")) === "true",
    "Environment tabs support keyboard",
  );
  verify(
    (await page.locator(".studio-order-link").getAttribute("href")) ===
      "/orcamento?ambiente=salas",
    "Preparation follows selected environment",
  );
  await page.locator("#preparar").scrollIntoViewIfNeeded();
  await prepTabs()
    .getByRole("tab", { name: "As medidas", exact: true })
    .click();
  await settle();
  verify(
    (await page.locator(".preparation-panel h3").textContent()) ===
      "Largura, altura e pontos fixos",
    "Preparation click changes instruction",
  );
  verify(
    (await page.locator(".space-diagram").getAttribute("class")) ===
      "space-diagram step-1",
    "Diagram highlights measuring step",
  );
  await prepTabs()
    .getByRole("tab", { name: "As medidas", exact: true })
    .press("ArrowRight");
  verify(
    (await prepTabs()
      .getByRole("tab", { name: "As referências", exact: true })
      .getAttribute("aria-selected")) === "true",
    "Preparation tabs support keyboard",
  );
  await page
    .getByRole("button", {
      name: "Perguntas para salas e painéis",
      exact: true,
    })
    .click();
  verify(
    (await page.locator("#environment-questions li").count()) === 3,
    "Environment-specific preparation questions expand",
  );
  await page
    .getByRole("button", {
      name: "Perguntas para salas e painéis",
      exact: true,
    })
    .click();
  verify(
    (await page.locator("#environment-questions").count()) === 0,
    "Questions collapse",
  );
  await page
    .getByRole("button", { name: "Abrir seleção de referências", exact: true })
    .click();
  verify(
    await page
      .getByRole("dialog", { name: "Referências salvas", exact: true })
      .isVisible(),
    "Preparation opens real selection dialog",
  );
  await page.keyboard.press("Escape");
  await page.locator(".studio-order-link").click();
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".choice")].some(
      (label) =>
        label.textContent.includes("Salas e painéis") &&
        label.querySelector("input")?.checked,
    ),
  );
  verify(
    await page
      .getByRole("checkbox", { name: "Salas e painéis", exact: true })
      .isChecked(),
    "Budget receives environment from homepage",
  );
  await page.goto(base, { waitUntil: "networkidle" });
  await page.mouse.move(14, 82);
  await page.waitForFunction(
    () =>
      document.querySelector(".studio-home")?.dataset.motionEngine === "gsap",
  );
  await page
    .getByRole("button", { name: "Próximo projeto", exact: true })
    .click();
  await page.waitForTimeout(70);
  verify(
    await page
      .locator("[data-project-mask]")
      .first()
      .evaluate(
        (e) => new DOMMatrixReadOnly(getComputedStyle(e).transform).m11 > 0.05,
      ),
    "Project click plays GSAP photo transition",
  );
  await settle();
  verify(
    await page
      .locator("[data-project-mask]")
      .first()
      .evaluate(
        (e) =>
          Math.abs(new DOMMatrixReadOnly(getComputedStyle(e).transform).m11) <
          0.01,
      ),
    "Photo transition clears without blocking",
  );
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: width < 760 ? 844 : 1000 });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.mouse.move(16 + width % 7, 84);
    await page.waitForFunction(
      () =>
        document.querySelector(".studio-home")?.dataset.motionEngine === "gsap",
    );
    for (const id of ["ambientes", "preparar", "guias"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await settle();
    }
    await page.locator(".studio-final").scrollIntoViewIfNeeded();
    await settle();
    await page.evaluate(() =>
      Promise.all([...document.images].filter(i => !i.closest('dialog:not([open])')).map((i) => i.decode().catch(() => {}))),
    );
    verify(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Expanded homepage fits ${width}px`,
    );
    verify(
      await page.evaluate(() =>
        [...document.images].filter(i => !i.closest('dialog:not([open])')).every((i) => i.complete && i.naturalWidth > 0),
      ),
      `Homepage images load at ${width}px`,
    );
    await page.screenshot({
      path: `qa/studio-full-${width}.png`,
      fullPage: true,
    });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator("#ambientes").scrollIntoViewIfNeeded();
  await settle();
  await page.screenshot({ path: "qa/studio-ambient-desktop.png" });
  await page.locator("#preparar").scrollIntoViewIfNeeded();
  await settle();
  await page.screenshot({ path: "qa/studio-prep-desktop.png" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () =>
      document.querySelector(".studio-home")?.dataset.motionMode === "reduced",
  );
  verify(
    await page
      .locator(".lettering-glyph")
      .first()
      .evaluate((e) => getComputedStyle(e).transform === "none"),
    "Reduced motion restores static lettering",
  );
  await envTabs().getByRole("tab", { name: "Banheiros", exact: true }).click();
  verify(
    (await page.locator(".environment-photo").getAttribute("src")).includes(
      "banheiro-escuro",
    ),
    "Reduced motion keeps environment interaction",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForFunction(
    () => document.querySelector(".studio-home")?.dataset.motionMode === "full",
  );
  verify(
    (await page.locator(".studio-home").getAttribute("data-motion-engine")) ===
      "gsap",
    "Motion reinitializes after preference change",
  );
  const fallback = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });
  await fallback.route("**/assets/studioMotion-*.js", (route) => route.abort());
  await fallback.goto(base, { waitUntil: "networkidle" });
  await fallback.locator("#ambientes").scrollIntoViewIfNeeded();
  verify(
    await fallback.locator(".environment-heading h2").isVisible(),
    "Content is visible if motion library fails",
  );
  await fallback.getByRole("tab", { name: "Quartos", exact: true }).click();
  verify(
    (await fallback.locator(".environment-photo").getAttribute("src")).includes(
      "quarto-madeira",
    ),
    "Tabs work if GSAP fails",
  );
  await fallback.close();
  verify(errors.length === 0, "No browser or GSAP errors");
} finally {
  await writeFile(
    "qa/studio-report.json",
    JSON.stringify({ base, checks, errors }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        base,
        checks: checks.length,
        failures: checks.filter((c) => !c.pass),
        errors,
      },
      null,
      2,
    ),
  );
  await browser.close();
}
