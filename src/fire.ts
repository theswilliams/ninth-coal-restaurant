// A small dithered fire: heat rises through a low-resolution grid, then each cell is quantised to a
// five-step ember palette with an ordered (Bayer) threshold, so the edges read as stippled coals rather than a blur.

const PALETTE = [0x00000000, 0xff0f1d72, 0xff1f37c2, 0xff1f7aff, 0xff4ac2ff, 0xffc0f0ff]; // ABGR, index 0 is clear
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

export interface FireOptions {
  host: HTMLElement;
  reduced: boolean;
  intensity: () => number;
  onLight?: (v: number) => void;
}

export function startFire(canvas: HTMLCanvasElement, o: FireOptions) {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(W, H);
  const px = new Uint32Array(img.data.buffer);
  const heat = new Float32Array(W * H);
  let fan = 0;
  let lean = 0;
  let visible = true;
  let last = 0;
  let frame = 0;

  function step() {
    const base = Math.min(1, o.intensity() + fan * 0.35);
    for (let x = 0; x < W; x++) heat[(H - 1) * W + x] = base * (0.82 + Math.random() * 0.18);
    const windBias = lean * 0.6;
    for (let y = 0; y < H - 1; y++) {
      for (let x = 0; x < W; x++) {
        const drift = Math.random() < Math.abs(windBias) ? Math.sign(windBias) : 0;
        const sx = Math.min(W - 1, Math.max(0, x - drift + (Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0)));
        const below = heat[(y + 1) * W + sx];
        heat[y * W + x] = Math.max(0, below - (0.010 + Math.random() * 0.030));
      }
    }
    fan *= 0.94;
    lean *= 0.94;
  }

  function draw() {
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const t = (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16 - 0.5;
        const lvl = Math.min(5, Math.max(0, Math.floor(heat[y * W + x] * 5 + 0.5 + t)));
        px[y * W + x] = PALETTE[lvl];
      }
    }
    ctx.putImageData(img, 0, 0);
    if (o.onLight) {
      let s = 0;
      for (let x = 0; x < W; x++) s += heat[(H - 14) * W + x];
      o.onLight(s / W);
    }
  }

  if (o.reduced) {
    for (let i = 0; i < 140; i++) step();
    draw();
    return { stoke() {} };
  }

  function loop(t: number) {
    requestAnimationFrame(loop);
    if (!visible || document.hidden || t - last < 42) return;
    last = t;
    step();
    draw();
    frame++;
  }
  for (let i = 0; i < 60; i++) step();
  requestAnimationFrame(loop);

  new IntersectionObserver((e) => { visible = e[0].isIntersecting; }).observe(canvas);

  let lx = 0;
  o.host.addEventListener('pointermove', (e) => {
    const dx = e.clientX - lx;
    lx = e.clientX;
    if (Math.abs(dx) > 40) return;
    fan = Math.min(1, fan + Math.abs(dx) * 0.012);
    lean = Math.max(-1, Math.min(1, lean + dx * 0.04));
  });
  o.host.addEventListener('pointerdown', () => { fan = 1; });

  return { stoke() { fan = 1; lean = Math.random() < 0.5 ? -0.8 : 0.8; }, get frames() { return frame; } };
}
