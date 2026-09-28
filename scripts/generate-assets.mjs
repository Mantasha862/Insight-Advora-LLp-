// Builds the favicon/app icons and the Open Graph image from the client's official logo
// files in public/assets (supplied with the design handoff). Run with `npm run assets`.
import sharp from "sharp";

const IVORY = { r: 250, g: 249, b: 245, alpha: 1 };
const MONO = "public/assets/monogram-mark.png";

const square = async (size, file, inset) => {
  const inner = Math.round(size * (1 - inset * 2));
  const m = await sharp(MONO).resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: IVORY } })
    .composite([{ input: m, gravity: "center" }])
    .png()
    .toFile(file);
};
await square(512, "app/icon.png", 0.08);
await square(180, "app/apple-icon.png", 0.12);

const og = await sharp("public/assets/logo-v.png").resize({ height: 560 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: IVORY } })
  .composite([{ input: og, gravity: "center" }])
  .png()
  .toFile("app/opengraph-image.png");

console.log("Icons and OG image written.");
