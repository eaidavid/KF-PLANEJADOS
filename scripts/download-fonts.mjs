import { mkdir, writeFile } from "node:fs/promises";
await mkdir("public/fonts", { recursive: true });
const endpoint =
  "https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400&family=Manrope:wght@400;500;600;700;800&display=swap";
const response = await fetch(endpoint, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  },
});
if (!response.ok) throw new Error("Font stylesheet download failed");
const original = await response.text();
await writeFile("qa/font-stylesheet.txt", original);
let css = "";
let count = 0;
const files = new Map();
for (const block of original
  .split(/\/\* /)
  .filter(
    (b) =>
      b.startsWith("latin */") ||
      b.startsWith("latin-ext */") ||
      (!original.includes("/*") && b.includes("@font-face")),
  )) {
  let chunk = original.includes("/*") ? "/* " + block : block;
  for (const match of [...chunk.matchAll(/url\((https:\/\/[^)]+)\)/g)]) {
    const url = match[1];
    let name = files.get(url);
    if (!name) {
      name = `font-${count++}.woff2`;
      const font = await fetch(url);
      if (!font.ok) throw new Error("Font download failed");
      await writeFile(
        `public/fonts/${name}`,
        Buffer.from(await font.arrayBuffer()),
      );
      files.set(url, name);
    }
    chunk = chunk.replace(url, `/fonts/${name}`);
  }
  css += chunk;
}
if (!count) throw new Error("Latin font subset missing");
await writeFile("public/fonts/fonts.css", css);
await writeFile(
  "public/fonts/SOURCES.txt",
  `Google Fonts: Literata and Manrope\n${endpoint}\nSIL Open Font License\nhttps://github.com/google/fonts/tree/main/ofl/literata\nhttps://github.com/google/fonts/tree/main/ofl/manrope\n`,
);
for (const family of ["literata", "manrope"]) {
  const license = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);
  if (!license.ok) throw new Error(`Missing ${family} font license`);
  await writeFile(`public/fonts/${family}-OFL.txt`, await license.text());
}
console.log(`${count} local font subsets saved`);
