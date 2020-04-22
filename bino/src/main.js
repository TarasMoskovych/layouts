import './scss/style.scss';
import * as $ from 'jquery';

import { Arrow } from './js/arrow';

const requireAll = r => r.keys().forEach(r);
new Arrow($);

requireAll(require.context('./img/icons/', true, /\.svg$/));
requireAll(require.context('./img/', false, /\.(png|jpg)$/));
