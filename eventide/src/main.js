import 'animate.css';
import './scss/style.scss';

import $ from 'jquery';
import { WOW } from 'wowjs';
import { Validator } from './js';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/brands';

import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/toast';

const requireAll = r => r.keys().forEach(r);
requireAll(require.context('./img/', false, /\.(png|jpg)$/));

$(() => {

  $('.evt-section__speaker').on('click', e => {
    const $target = $(e.currentTarget);
    $('.content-img').attr('src', $target.find('img').attr('src'));
    $('.content-title').text($target.find('h3').text());
    $('.toast').toast('show');
  });

  new Validator('.needs-validation');
});

new WOW({ offset: 150 }).init();
