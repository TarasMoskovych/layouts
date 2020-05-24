import './scss/style.scss';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/brands';

import './js';

const requireAll = r => r.keys().forEach(r);
requireAll(require.context('./img/', false, /\.(png|jpg)$/));
