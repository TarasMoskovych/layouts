import { selectElement, selectors } from './shared';

const body = selectElement(selectors.BODY);
const nav = selectElement(selectors.NAV);
const menuToggler = selectElement(selectors.NAV_TOGGLE);

const toggleNav = () => nav.classList.toggle(selectors.NAV_OPEN);
const isOpened = () => nav.classList.contains(selectors.NAV_OPEN);

menuToggler.addEventListener('click', e => !e.stopPropagation() && toggleNav());
body.addEventListener('click', e => !e.target.closest(selectors.NAV_LIST) && isOpened() && toggleNav());
