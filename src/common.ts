import '@fontsource/young-serif/400.css';
import '@fontsource-variable/hanken-grotesk/index.css';
import './style.css';
import { serviceState } from './service';

function paint() {
  const s = serviceState();
  document.documentElement.dataset.state = s.open ? 'open' : 'closed';
  document.querySelectorAll('[data-status-word]').forEach((el) => { el.textContent = s.word; });
  document.querySelectorAll('[data-status-short]').forEach((el) => { el.textContent = s.short; });
  document.querySelectorAll('[data-status-long]').forEach((el) => { el.textContent = s.long; });
}
paint();
setInterval(paint, 30000);
