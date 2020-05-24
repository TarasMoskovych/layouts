import ScrollReveal from 'scrollreveal';
import { selectors } from './shared';

window.sr = ScrollReveal();

const reveal = (selector, options) => sr.reveal(selector, options);
const defaultOptions = {
  duration: 1000,
  distance: '25rem',
  delay: 400,
};

reveal(selectors.ANIMATE_LEFT,   { ...defaultOptions, origin: 'left', delay: 300 });
reveal(selectors.ANIMATE_RIGHT,  { ...defaultOptions, origin: 'right', delay: 600 });
reveal(selectors.ANIMATE_TOP,    { ...defaultOptions, origin: 'top' });
reveal(selectors.ANIMATE_BOTTOM, { ...defaultOptions, origin: 'bottom' });
