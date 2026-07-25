import sharp from "sharp";
import { join } from "path";

const root = process.cwd();
const files = [
  ["public/images/hero-poster.jpg", "public/images/hero-poster.webp"],
  ["public/images/og-image.png", "public/images/og-image.webp"],
];

for (const [input, output] of files) {
  try {
    await sharp(join(root, input))
      .webp({ quality: 85, effort: 6 })
      .toFile(join(root, output));
    console.log(`Converted: ${input} → ${output}`);
  } catch (err) {
    console.error(`Failed: ${input}: ${err.message}`);
  }
}
