import { CLOSE_H, DAY_NAMES, LAST_ORDERS, OPEN_DAYS, OPEN_H } from './data';

export interface ServiceState {
  open: boolean;
  word: string;
  short: string;
  long: string;
  /** 0..1 how hard the fire is burning right now; drives the flame and the room light */
  intensity: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

function fmtDur(ms: number) {
  const m = Math.max(0, Math.round(ms / 60000));
  const d = Math.floor(m / 1440);
  const h = Math.floor((m % 1440) / 60);
  const mm = m % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${pad(mm)}m`;
  return `${mm}m`;
}

/** Service for a night that starts on calendar day `off` runs from that day at 22:00 until 02:00 the next morning. */
export function serviceState(now = new Date()): ServiceState {
  const y = now.getFullYear();
  const mo = now.getMonth();
  const d = now.getDate();
  for (let off = -1; off <= 7; off++) {
    const start = new Date(y, mo, d + off, OPEN_H, 0, 0, 0);
    if (!OPEN_DAYS.includes(start.getDay())) continue;
    const end = new Date(y, mo, d + off + 1, CLOSE_H, 0, 0, 0);
    if (now >= end) continue;
    if (now >= start) {
      const last = new Date(y, mo, d + off + 1, LAST_ORDERS.h, LAST_ORDERS.m, 0, 0);
      const t = (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
      const intensity = 0.45 + 0.55 * Math.sin(Math.PI * t);
      const long = now < last
        ? `Open until 02:00. ${fmtDur(last.getTime() - now.getTime())} until last orders.`
        : `Last orders called. Closing at 02:00, ${fmtDur(end.getTime() - now.getTime())} left.`;
      return { open: true, word: 'Open now', short: 'Open', long, intensity };
    }
    const when = off === 0 ? 'tonight' : off === 1 ? 'tomorrow' : DAY_NAMES[start.getDay()];
    const dark = !OPEN_DAYS.includes(now.getDay());
    return {
      open: false,
      word: dark ? 'Dark tonight' : 'Closed',
      short: dark ? 'Dark' : 'Closed',
      long: `Opens ${when} at 22:00, in ${fmtDur(start.getTime() - now.getTime())}.`,
      intensity: 0.5,
    };
  }
  return { open: false, word: 'Closed', short: 'Closed', long: 'Opens Wednesday at 22:00.', intensity: 0.5 };
}
