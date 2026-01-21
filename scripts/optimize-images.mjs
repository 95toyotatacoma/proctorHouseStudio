import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const INPUT_DIR = "public/images";
const OUT_DIR = "public/images-optimized";
const widths = [480, 768, 1024, 1440, 1920];

await fs.mkdir(OUT_DIR, { recursive: true });

const files = await fg([`${INPUT_DIR}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}`]);

for (const file of files) {
  try {
    const rel = path.relative(INPUT_DIR, file);
    const base = rel.replace(/\.[^.]+$/, "");
    const outFolder = path.join(OUT_DIR, path.dirname(rel));
    await fs.mkdir(outFolder, { recursive: true });

    const img = sharp(file);
    const meta = await img.metadata();

    for (const w of widths) {
      if (meta.width && w > meta.width) continue;

      const outBase = path.join(OUT_DIR, `${base}-${w}`);

      await img
        .resize({ width: w })
        .toFormat("webp", { quality: 78 })
        .toFile(`${outBase}.webp`);

      await img
        .resize({ width: w })
        .toFormat("avif", { quality: 50 })
        .toFile(`${outBase}.avif`);
    }

    await img
      .resize({ width: Math.min(1440, meta.width ?? 1440) })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(OUT_DIR, `${base}.jpg`));

    console.log("Optimized:", rel);
  } catch (error) {
    const rel = path.relative(INPUT_DIR, file);
    console.warn("Skipped unreadable file:", rel, "-", error?.message ?? error);
  }
}

console.log("Done.");
