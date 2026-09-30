import './common';
import { DAY_SHORT, OPEN_DAYS, SLOTS } from './data';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// next six service nights
const nights: Date[] = [];
for (let i = 0; nights.length < 6 && i < 21; i++) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + i);
  if (OPEN_DAYS.includes(d.getDay())) nights.push(d);
}
const nightLabel = (d: Date) => `${DAY_SHORT[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;

let night = 0;
let party = 2;
let time = '';

const slotDate = (base: Date, slot: string) => {
  const [h, m] = slot.split(':').map(Number);
  const d = new Date(base);
  d.setHours(h, m, 0, 0);
  if (h < 12) d.setDate(d.getDate() + 1); // after midnight belongs to the next calendar day
  return d;
};

function renderNights() {
  $('nights').innerHTML = nights.map((d, i) =>
    `<button type="button" class="chip" data-i="${i}" aria-pressed="${i === night}">${nightLabel(d)}</button>`).join('');
}
function renderTimes() {
  const cutoff = Date.now() + 30 * 60000;
  let anyOff = false;
  $('times').innerHTML = SLOTS.map((s) => {
    const off = slotDate(nights[night], s).getTime() < cutoff;
    anyOff ||= off;
    return `<button type="button" class="chip" data-t="${s}" aria-pressed="${s === time}" ${off ? 'disabled' : ''}>${s}</button>`;
  }).join('');
  $('timeHint').textContent = anyOff ? 'Times less than half an hour away are not offered.' : 'Last orders are at 01:30.';
  if (time && slotDate(nights[night], time).getTime() < cutoff) time = '';
}
function renderParty() {
  $('party').textContent = String(party);
  ($('less') as HTMLButtonElement).disabled = party <= 1;
  ($('more') as HTMLButtonElement).disabled = party >= 6;
  $('partyHint').textContent = party === 1 ? 'guest' : party === 6 ? 'guests (for seven or more, ask about a dark night)' : 'guests';
  const counter = document.querySelector<HTMLInputElement>('input[value="counter"]')!;
  const table = document.querySelector<HTMLInputElement>('input[value="table"]')!;
  counter.disabled = party > 4;
  if (party > 4) table.checked = true;
  $('seatHint').textContent = party > 4 ? 'The counter seats up to four together, so this party sits at a table.' : '';
}
function renderSlip() {
  $('s-night').textContent = nightLabel(nights[night]);
  $('s-time').textContent = time || '–';
  $('s-party').textContent = String(party);
  const seat = (document.querySelector<HTMLInputElement>('input[name="seat"]:checked')!).value;
  $('s-seat').textContent = seat === 'counter' ? 'Counter' : 'Table';
  $('s-name').textContent = ($('name') as HTMLInputElement).value.trim() || '–';
}
const refresh = () => { renderNights(); renderTimes(); renderParty(); renderSlip(); };

$('nights').addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('button[data-i]');
  if (b) { night = Number(b.dataset.i); refresh(); }
});
$('times').addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-t]');
  if (b && !b.disabled) { time = b.dataset.t!; refresh(); }
});
$('less').addEventListener('click', () => { party = Math.max(1, party - 1); refresh(); });
$('more').addEventListener('click', () => { party = Math.min(6, party + 1); refresh(); });
$('form').addEventListener('change', renderSlip);
$('name').addEventListener('input', renderSlip);

const fail = (id: string, msg: string) => {
  const p = $(id + '-err');
  p.textContent = msg;
  p.hidden = false;
  $(id).setAttribute('aria-invalid', 'true');
};
const clear = (id: string) => { $(id + '-err').hidden = true; $(id).removeAttribute('aria-invalid'); };

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = ($('name') as HTMLInputElement).value.trim();
  const contact = ($('contact') as HTMLInputElement).value.trim();
  clear('name'); clear('contact');
  let first: string | null = null;
  if (!name) { fail('name', 'Add a name for the booking.'); first = 'name'; }
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) || contact.replace(/\D/g, '').length >= 7;
  if (!ok) { fail('contact', 'Add an email address or a phone number we could reach.'); first ||= 'contact'; }
  if (!time) { $('timeHint').textContent = 'Pick a time first.'; first ||= 'times'; }
  if (first) { (first === 'times' ? $('times').querySelector('button:not([disabled])') as HTMLElement : $(first)).focus(); return; }
  const seat = (document.querySelector<HTMLInputElement>('input[name="seat"]:checked')!).value;
  $('doneText').textContent = `${name}, party of ${party}, ${seat === 'counter' ? 'at the counter' : 'at a table'}, ${nightLabel(nights[night])} at ${time}.`;
  $('form').hidden = true;
  $('slip').classList.add('slip--done');
  $('done').hidden = false;
  $('done').focus();
});
$('again').addEventListener('click', () => {
  ($('form') as HTMLFormElement).reset();
  party = 2; time = ''; night = 0;
  $('form').hidden = false;
  $('done').hidden = true;
  $('slip').classList.remove('slip--done');
  refresh();
  $('name').focus();
});

refresh();
