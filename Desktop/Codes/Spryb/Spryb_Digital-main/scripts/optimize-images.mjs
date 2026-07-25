import sharp from "sharp";
import { readdirSync, unlinkSync, existsSync } from "fs";
import { join, parse } from "path";

const dirs = [
  "src/assets/images",
  "src/assets/logos",
];

const converted = [];
const skipped = [];

for (const dir of dirs) {
  const fullPath = join(process.cwd(), dir);
  if (!existsSync(fullPath)) {
    console.log(`Skipping: ${dir} (not found)`);
    continue;
  }
  const files = readdirSync(fullPath);
  for (const file of files) {
    const ext = file.toLowerCase();
    if (!ext.endsWith(".png") && !ext.endsWith(".jpg") && !ext.endsWith(".jpeg")) continue;
    if (ext.endsWith(".webp")) continue;

    const inputPath = join(fullPath, file);
    const parsed = parse(file);
    const outputName = `${parsed.name}.webp`;
    const outputPath = join(fullPath, outputName);

    try {
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);
      const oldSize = (await import("fs")).statSync(inputPath).size;
      const newSize = (await import("fs")).statSync(outputPath).size;
      const savings = ((1 - newSize / oldSize) * 100).toFixed(1);
      unlinkSync(inputPath);
      converted.push({ file, outputName, savings: `${savings}%`, oldSize: `${(oldSize / 1024).toFixed(1)}KB`, newSize: `${(newSize / 1024).toFixed(1)}KB` });
    } catch (err) {
      skipped.push({ file, error: err.message });
    }
  }
}

console.log("\n=== Converted ===");
for (const c of converted) {
  console.log(`${c.file} → ${c.outputName} (${c.oldSize} → ${c.newSize}, ${c.savings} saved)`);
}

if (skipped.length) {
  console.log("\n=== Skipped ===");
  for (const s of skipped) {
    console.log(`${s.file}: ${s.error}`);
  }
}

console.log(`\nDone: ${converted.length} converted, ${skipped.length} skipped`);
