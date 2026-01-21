import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const INPUT_DIR = "public/images";
const OUT_DIR = "public/images-optimized";
const widths = [480, 768, 1024, 1440, 1920];
const allowUpscale = process.env.ALLOW_UPSCALE === "1";

const inputGlob =
  process.env.IMAGE_GLOB ??
  (process.env.IMAGE_SUBDIR
    ? `${INPUT_DIR}/${process.env.IMAGE_SUBDIR}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}`
    : `${INPUT_DIR}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}`);

await fs.mkdir(OUT_DIR, { recursive: true });

const files = await fg([inputGlob]);

for (const file of files) {
  const rel = path.relative(INPUT_DIR, file);

  try {
    const relNoExt = rel.replace(/\.[^.]+$/, "");
    const outFolder = path.join(OUT_DIR, path.dirname(rel));
    await fs.mkdir(outFolder, { recursive: true });

    // ✅ base instance
    const baseImg = sharp(file, { failOn: "none" });
    const meta = await baseImg.metadata();

    for (const w of widths) {
    if (!allowUpscale && meta.width && w > meta.width) continue;

      const outBase = path.join(OUT_DIR, `${relNoExt}-${w}`);

      // ✅ clone per output (CRITICAL FIX)
      await baseImg
        .clone()
        .resize({ width: w })
        .toFormat("webp", { quality: 78 })
        .toFile(`${outBase}.webp`);

      await baseImg
        .clone()
        .resize({ width: w })
        .toFormat("avif", { quality: 50 })
        .toFile(`${outBase}.avif`);
    }

    // ✅ jpg fallback
    await baseImg
      .clone()
      .resize({ width: Math.min(1440, meta.width ?? 1440) })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(OUT_DIR, `${relNoExt}.jpg`));

    console.log("Optimized:", rel);
  } catch (error) {
    console.warn(
      "Skipped unreadable file:",
      rel,
      "-",
      error?.message ?? error
    );
  }
}

console.log("Done.");
