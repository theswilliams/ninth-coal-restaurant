import './common';
import { DAY_NAMES, OPEN_DAYS } from './data';

const today = new Date().getDay();
const order = [1, 2, 3, 4, 5, 6, 0];
document.getElementById('days')!.innerHTML = order.map((d) => {
  const open = OPEN_DAYS.includes(d);
  return `<li data-day="${d}"${d === today ? ' aria-current="date"' : ''}${open ? '' : ' class="is-dark"'}><span>${DAY_NAMES[d]}</span><i aria-hidden="true"></i><span>${open ? '22:00 – 02:00' : 'Dark nights only'}</span></li>`;
}).join('');
