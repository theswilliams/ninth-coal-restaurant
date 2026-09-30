import './common';
import { NIGHT } from './data';
import { startFire } from './fire';
import { serviceState } from './service';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const win = document.getElementById('window') as HTMLElement;
const canvas = document.getElementById('fire') as HTMLCanvasElement;

let intensity = serviceState().intensity;
setInterval(() => { intensity = serviceState().intensity; }, 15000);

const fire = startFire(canvas, {
  host: win,
  reduced,
  intensity: () => intensity,
  onLight: (v) => win.style.setProperty('--fire', (0.55 + Math.min(1, v * 2.6) * 0.45).toFixed(2)),
});
document.getElementById('stoke')!.addEventListener('click', () => fire.stoke());

const levels = [0.55, 0.8, 1, 0.6];
document.getElementById('night')!.innerHTML = NIGHT.map((n, i) =>
  `<li style="--lvl:${levels[i]}"><time class="night__at">${n.at}</time><div><h3>${n.name}</h3><p>${n.body}</p></div></li>`
).join('');
