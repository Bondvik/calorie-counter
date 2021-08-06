import Counter from './modules/counter.js';

const counterFormElement = document.querySelector('.counter__form');
const counter = new Counter(counterFormElement);
counter.init();
