export type Diet = 'V' | 'GF';
export interface Dish { name: string; note: string; price: number; diet: Diet[]; hot?: boolean }
export interface Group { id: string; name: string; blurb: string; dishes: Dish[] }

export const MENU: Group[] = [
  {
    id: 'snacks', name: 'Snacks', blurb: 'While the bed builds.',
    dishes: [
      { name: 'Hearth bread, cultured butter', note: 'Baked in the mouth of the oven, smoked salt.', price: 9, diet: ['V'] },
      { name: 'Oysters over coals', note: 'Brown butter, lemon. Three to a plate.', price: 18, diet: ['GF'] },
      { name: 'Burnt leeks, romesco', note: 'Charred until they give, almonds on top.', price: 12, diet: ['V', 'GF'] },
      { name: 'Chicken skin, pickled onion', note: 'Rendered on the grate, crisp as paper.', price: 9, diet: ['GF'] },
      { name: 'Smoked almonds', note: 'Hot from the ash, rosemary salt.', price: 7, diet: ['V', 'GF'] },
    ],
  },
  {
    id: 'embers', name: 'From the embers', blurb: 'Buried in the ash and left alone.',
    dishes: [
      { name: 'Ash-baked beets', note: 'Whipped goat curd, walnut, aged vinegar.', price: 16, diet: ['V', 'GF'] },
      { name: 'Coal-roasted cabbage', note: 'Brown butter, hazelnut, a lot of black pepper.', price: 15, diet: ['V', 'GF'] },
      { name: 'Sweet potato from the embers', note: 'Split, miso butter, chives.', price: 14, diet: ['V', 'GF'] },
      { name: 'Mushrooms on hearth toast', note: 'Egg yolk, grilled onion, thyme.', price: 17, diet: ['V'] },
    ],
  },
  {
    id: 'fire', name: 'From the fire', blurb: 'Over oak and charcoal. Ready when it is.',
    dishes: [
      { name: 'Hanger steak', note: 'Bone-marrow butter, salsa verde. Cooked medium-rare unless you say.', price: 36, diet: ['GF'], hot: true },
      { name: 'Half chicken, hay-smoked', note: 'Pan juices, grilled lemon.', price: 32, diet: ['GF'], hot: true },
      { name: 'Pork chop', note: 'Charred apple, grain mustard, sage.', price: 34, diet: [] },
      { name: 'Lamb ribs', note: 'Chilli honey, yoghurt, torn mint.', price: 29, diet: ['GF'] },
      { name: 'Whole fish of the night', note: 'Whatever came in, scaled and grilled whole. Serves two.', price: 58, diet: ['GF'] },
    ],
  },
  {
    id: 'sides', name: 'Sides', blurb: 'For the middle of the table.',
    dishes: [
      { name: 'Potatoes cooked in tallow', note: 'Crushed, then crisped on the flat iron.', price: 10, diet: ['GF'] },
      { name: 'Bitter leaves, anchovy dressing', note: 'Cold and sharp, to cut the smoke.', price: 11, diet: ['GF'] },
      { name: 'Hearth flatbread', note: 'Brushed with the drippings.', price: 7, diet: ['V'] },
      { name: 'Beans and ham hock', note: 'Cooked slow at the cool end of the fire.', price: 12, diet: ['GF'] },
    ],
  },
  {
    id: 'sweet', name: 'Sweet', blurb: 'Last orders are at half past one.',
    dishes: [
      { name: 'Burnt honey custard', note: 'Set in the oven as the fire dies down.', price: 11, diet: ['V', 'GF'] },
      { name: 'Dark chocolate, olive oil, sea salt', note: 'Served warm, with a spoon.', price: 10, diet: ['V'] },
      { name: 'Grilled stone fruit', note: 'Sour cream, black pepper, in season only.', price: 11, diet: ['V', 'GF'] },
    ],
  },
];

export const DRINKS = [
  ['Wine by the glass', 'from 12'],
  ['Sake, three pours', '18'],
  ['Smoked negroni', '16'],
  ['Charred lemon soda', '6'],
] as const;

// Service: Wed-Sun, 22:00-02:00. The night belongs to the day it starts on, so Sunday service ends Monday 02:00.
export const OPEN_DAYS = [3, 4, 5, 6, 0]; // getDay(): Wed, Thu, Fri, Sat, Sun
export const OPEN_H = 22;
export const CLOSE_H = 2;
export const LAST_ORDERS = { h: 1, m: 30 };
export const SLOTS = ['22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00', '01:30'];
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const NIGHT = [
  { at: '22:00', name: 'First coals', body: 'The oak goes in and the room is still quiet. Bread, oysters, snacks from the edge of the heat.' },
  { at: '23:00', name: 'The bed', body: 'Coals rake flat. Vegetables go into the ash and the first steaks go on the grate.' },
  { at: '00:00', name: 'Full fire', body: 'The hottest hour. Steak, chops, whole fish and ribs, as fast as the counter can eat them.' },
  { at: '01:00', name: 'Banking down', body: 'The fire drops. Slow things, sweet things, and the long last plates before half past one.' },
] as const;
