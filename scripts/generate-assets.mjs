// Derives every logo/icon asset from the client's supplied logo (assets/logo-source.png).
// Run with `npm run assets` whenever the source logo changes.
import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";

const SRC = "assets/logo-source.png";
const OUT = "public/assets";
const IVORY = { r: 250, g: 249, b: 245, alpha: 1 };
await mkdir(OUT, { recursive: true });

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;
const bg = [data[0], data[1], data[2]];

function bbox(y0, y1) {
  let minx = W, maxx = 0, miny = H, maxy = 0;
  for (let y = y0; y < y1; y++)
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      const d = Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]);
      if (d > 40) {
        minx = Math.min(minx, x); maxx = Math.max(maxx, x);
        miny = Math.min(miny, y); maxy = Math.max(maxy, y);
      }
    }
  return { left: minx, top: miny, width: maxx - minx + 1, height: maxy - miny + 1 };
}

// Transparent version: alpha from distance to the background colour.
const alphaBuf = Buffer.from(data);
for (let i = 0; i < alphaBuf.length; i += 4) {
  const d = Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]);
  const a = Math.min(1, d / 90);
  alphaBuf[i + 3] = Math.round(a * 255);
}
const alphaImg = () => sharp(alphaBuf, { raw: { width: W, height: H, channels: 4 } });

const mono = bbox(0, 475);
const word = bbox(475, H);
const pad = 8;
const monoBox = { left: mono.left - pad, top: Math.max(0, mono.top - pad), width: mono.width + pad * 2, height: mono.height + pad * 2 };

await sharp(SRC).extract(monoBox).png().toFile(`${OUT}/logo-monogram.png`);
await alphaImg().extract(monoBox).png().toFile(`${OUT}/monogram-alpha.png`);
await copyFile(SRC, `${OUT}/logo-v.png`);

// Horizontal lockup: monogram left, wordmark + tagline right, transparent background.
const monoH = 220;
const monoPng = await alphaImg().extract(monoBox).resize({ height: monoH }).png().toBuffer();
const monoMeta = await sharp(monoPng).metadata();
const wordPng = await alphaImg().extract(word).resize({ height: Math.round(monoH * 0.62) }).png().toBuffer();
const wordMeta = await sharp(wordPng).metadata();
const gap = 26;
const hW = monoMeta.width + gap + wordMeta.width;
await sharp({ create: { width: hW, height: monoH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([
    { input: monoPng, left: 0, top: 0 },
    { input: wordPng, left: monoMeta.width + gap, top: Math.round((monoH - wordMeta.height) / 2) },
  ])
  .png()
  .toFile(`${OUT}/logo-h.png`);

// Icons (square, ivory background).
const square = async (size, file, inset = 0.1) => {
  const inner = Math.round(size * (1 - inset * 2));
  const m = await sharp(SRC).extract(monoBox).resize({ width: inner, height: inner, fit: "contain", background: IVORY }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: IVORY } })
    .composite([{ input: m, gravity: "center" }]).png().toFile(file);
};
await square(512, "app/icon.png", 0.06);
await square(180, "app/apple-icon.png", 0.1);
await square(160, `${OUT}/favicon-ia.png`, 0.06);

// Open Graph image 1200×630.
const og = await sharp(SRC).resize({ height: 560 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: IVORY } })
  .composite([{ input: og, gravity: "center" }]).png().toFile("app/opengraph-image.png");

console.log("Assets written", { mono: monoBox, word, lockup: [hW, monoH] });
