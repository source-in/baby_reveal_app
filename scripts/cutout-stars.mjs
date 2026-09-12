// Cuts the painted star portraits out of their square backgrounds so they float
// on the stars screen. Re-run after changing one:
//   node scripts/cutout-stars.mjs
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const OUT = "public/images/cutouts";
const FEATHER = 1.2; // edge softness (blur sigma)
const MAX_WIDTH = 640;

// What counts as backdrop for each painting. `bg` is the average corner colour.
// Night sky: the sky and its purple/pink clouds are all bluer than they are green, while
// the cream star, white hair, pale shirts and skin are not.
const nightSky = (r, g, b) =>
  // Sky and lavender clouds are bluer than they are green.
  b > g + 5 ||
  // Pale pink cloud highlights: bright, with green and blue level. Warm cream stars,
  // skin and pale clothing all keep noticeably more green than blue.
  (r > 245 && g < 232 && g - b <= 7);

const BACKDROP = {
  star_1: nightSky,
  star_2: nightSky,
  star_3: nightSky,
  // Flat cream page.
  star_4: (r, g, b, bg) => Math.max(Math.abs(r - bg[0]), Math.abs(g - bg[1]), Math.abs(b - bg[2])) < 22,
};

await mkdir(OUT, { recursive: true });

for (const [name, isBackdrop] of Object.entries(BACKDROP)) {
  const { data, info } = await sharp(`public/images/${name}.png`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const n = w * h;
  const corners = [0, w - 1, n - w, n - 1];
  const bg = [0, 1, 2].map((c) => corners.reduce((sum, p) => sum + data[p * 4 + c], 0) / corners.length);
  const backdropAt = (p) => isBackdrop(data[p * 4], data[p * 4 + 1], data[p * 4 + 2], bg);
  const neighbours = (p) => {
    const x = p % w;
    return [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, p >= w ? p - w : -1, p < n - w ? p + w : -1];
  };

  // 1. Flood the backdrop in from the image edges; the painted star border stops it.
  const outside = new Uint8Array(n);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, n - w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (outside[p] || !backdropAt(p)) continue;
    outside[p] = 1;
    for (const q of neighbours(p)) if (q >= 0 && !outside[q]) stack.push(q);
  }

  // 2. Keep only the biggest remaining piece, which drops the little decorative stars.
  const piece = new Int32Array(n).fill(-1);
  let best = -1;
  let bestSize = 0;
  for (let start = 0, id = 0; start < n; start++) {
    if (outside[start] || piece[start] !== -1) continue;
    const todo = [start];
    piece[start] = id;
    let size = 0;
    while (todo.length) {
      const p = todo.pop();
      size++;
      for (const q of neighbours(p)) {
        if (q >= 0 && !outside[q] && piece[q] === -1) {
          piece[q] = id;
          todo.push(q);
        }
      }
    }
    if (size > bestSize) {
      bestSize = size;
      best = id;
    }
    id++;
  }

  // 3. Soft-edged alpha from that piece.
  const mask = Buffer.alloc(n);
  for (let p = 0; p < n; p++) mask[p] = piece[p] === best ? 255 : 0;
  const soft = await sharp(mask, { raw: { width: w, height: h, channels: 1 } })
    .blur(FEATHER)
    .extractChannel(0)
    .raw()
    .toBuffer();
  for (let p = 0; p < n; p++) data[p * 4 + 3] = soft[p];

  const cut = await sharp(data, { raw: { width: w, height: h, channels: 4 } }).trim().png().toBuffer();
  await sharp(cut).resize({ width: MAX_WIDTH, withoutEnlargement: true }).png().toFile(`${OUT}/${name}.png`);
  console.log("✓", name, `${((bestSize / n) * 100).toFixed(1)}% of the image kept`);
}
