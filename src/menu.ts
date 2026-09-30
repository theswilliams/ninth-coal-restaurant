import './common';
import { DRINKS, MENU, type Diet } from './data';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const groupsEl = $('groups');
const menuEl = $('menu');
const countEl = $('count');
const emptyEl = $('empty');

let group = 'all';
const diets = new Set<Diet>();

const chip = (id: string, label: string) =>
  `<button type="button" class="chip" data-group="${id}" aria-pressed="${id === group}">${label}</button>`;
groupsEl.innerHTML = chip('all', 'All') + MENU.map((g) => chip(g.id, g.name)).join('');

const dietBadge = (d: Diet) =>
  `<abbr class="diet" title="${d === 'V' ? 'Vegetarian' : 'Gluten-free'}" aria-label="${d === 'V' ? 'Vegetarian' : 'Gluten-free'}">${d}</abbr>`;

function render() {
  let shown = 0;
  menuEl.innerHTML = MENU.filter((g) => group === 'all' || g.id === group).map((g) => {
    const dishes = g.dishes.filter((d) => [...diets].every((x) => d.diet.includes(x)));
    if (!dishes.length) return '';
    shown += dishes.length;
    return `<section class="mgroup" aria-labelledby="g-${g.id}">
      <div class="mgroup__head"><h2 id="g-${g.id}">${g.name}</h2><p>${g.blurb}</p></div>
      <ul class="leaders">${dishes.map((d) => `<li class="dish">
        <div class="dish__top"><h3>${d.name}</h3><i class="dish__dots" aria-hidden="true"></i><span class="dish__price">$${d.price}</span></div>
        <p>${d.note}${d.hot ? ' <span class="dish__wait">≈20 min</span>' : ''}</p>
        ${d.diet.length ? `<span class="dish__diet">${d.diet.map(dietBadge).join('')}</span>` : ''}
      </li>`).join('')}</ul>
    </section>`;
  }).join('');
  emptyEl.hidden = shown > 0;
  countEl.textContent = `${shown} ${shown === 1 ? 'dish' : 'dishes'}`;
}

groupsEl.addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-group]');
  if (!b) return;
  group = b.dataset.group!;
  groupsEl.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  render();
});
document.querySelectorAll<HTMLButtonElement>('button[data-diet]').forEach((b) =>
  b.addEventListener('click', () => {
    const d = b.dataset.diet as Diet;
    if (diets.has(d)) diets.delete(d); else diets.add(d);
    b.setAttribute('aria-pressed', String(diets.has(d)));
    render();
  }),
);
$('reset').addEventListener('click', () => {
  group = 'all';
  diets.clear();
  groupsEl.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String((x as HTMLElement).dataset.group === 'all')));
  document.querySelectorAll('button[data-diet]').forEach((x) => x.setAttribute('aria-pressed', 'false'));
  render();
});

$('drinks').innerHTML = DRINKS.map(([n, p]) => `<li class="dish"><div class="dish__top"><h3>${n}</h3><i class="dish__dots" aria-hidden="true"></i><span class="dish__price">${/^\d/.test(p) ? '$' : '$'}${p.replace('from ', '')}${p.startsWith('from') ? '+' : ''}</span></div></li>`).join('');
render();
