import sharp from "sharp";
import { statSync, renameSync } from "fs";

const targets = [
  "src/assets/images/palash-ghibli.webp",
  "src/assets/images/akash-ghibli.webp",
  "src/assets/images/honey-ghibli.webp",
  "src/assets/images/archit-ghibli.webp",
  "src/assets/images/rishabh-ghibli.webp",
  "src/assets/images/pratik-ghibli.webp",
  "src/assets/images/jaya-ghibli.webp",
  "src/assets/images/chanpreet-ghibli.webp",
  "src/assets/images/chhavi-ghibli.webp",
  "src/assets/images/priyanshi-ghibli.webp",
  "src/assets/images/rishabh-mishra.webp",
  "src/assets/images/archit-tripathi.webp",
  "src/assets/images/honey-kumar.webp",
  "src/assets/images/chhavi-maurya.webp",
  "src/assets/images/priyanshi-saxena.webp",
  "src/assets/images/pratik-singh.webp",
  "src/assets/images/40b674d4-5571-45bc-99ec-40750262f6bf.webp",
  "src/assets/images/logo.webp",
  "public/images/hero-poster.webp",
  "public/images/og-image.webp",
];

for (const f of targets) {
  try {
    const before = statSync(f).size;
    await sharp(f).webp({ quality: 70, effort: 6 }).toFile(f + ".tmp");
    const after = statSync(f + ".tmp").size;
    renameSync(f + ".tmp", f);
    console.log(`${f}: ${(before / 1024).toFixed(1)}KB → ${(after / 1024).toFixed(1)}KB`);
  } catch (e) {
    console.log(`Skipped ${f}: ${e.message}`);
  }
}
