// Removes the flat cream background from the Survival Kit icons so they sit
// cleanly on the page. Re-run after adding or changing an icon:
//   node scripts/cutout-icons.mjs
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "public/images";
const OUT = "public/images/cutouts";
const FILES = ["survival_coffee", "survival_diapers", "survival_pillow", "survival_camera", "survival_heart"];
const HARD = 12; // colour distance from the background treated as fully transparent
const SOFT = 40; // distance at which pixels become fully opaque again

await mkdir(OUT, { recursive: true });

for (const name of FILES) {
  const { data, info } = await sharp(`${SRC}/${name}.png`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const at = (x, y) => (y * w + x) * 4;
  const corners = [at(0, 0), at(w - 1, 0), at(0, h - 1), at(w - 1, h - 1)];
  const bg = [0, 1, 2].map((c) => corners.reduce((sum, i) => sum + data[i + c], 0) / corners.length);
  const dist = (i) =>
    Math.max(Math.abs(data[i] - bg[0]), Math.abs(data[i + 1] - bg[1]), Math.abs(data[i + 2] - bg[2]));

  // Flood-fill from the edges so light areas inside the drawing are kept.
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, 0, x, h - 1);
  for (let y = 0; y < h; y++) stack.push(0, y, w - 1, y);
  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    const p = y * w + x;
    if (seen[p]) continue;
    seen[p] = 1;
    const i = p * 4;
    const d = dist(i);
    if (d >= SOFT) continue;
    data[i + 3] = d <= HARD ? 0 : Math.round((255 * (d - HARD)) / (SOFT - HARD));
    stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }

  await sharp(data, { raw: { width: w, height: h, channels: 4 } }).trim().png().toFile(`${OUT}/${name}.png`);
  console.log("✓", name);
}
