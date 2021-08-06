export default class Result {
  constructor() {
    this.counterResultElement = document.querySelector('.counter__result');
    this.caloriesNormOutputElement = this.counterResultElement.querySelector('#calories-norm');
    this.caloriesMinOutputElement = this.counterResultElement.querySelector('#calories-minimal');
    this.caloriesMaxOutputElement = this.counterResultElement.querySelector('#calories-maximal');
  }

  show(calories) {
    this.caloriesNormOutputElement.textContent = calories.norm;
    this.caloriesMinOutputElement.textContent = calories.min;
    this.caloriesMaxOutputElement.textContent = calories.max;
    this.counterResultElement.classList.remove('counter__result--hidden');
  }

  hide() {
    this.caloriesNormOutputElement.textContent = 0;
    this.caloriesMinOutputElement.textContent = 0;
    this.caloriesMaxOutputElement.textContent = 0;
    this.counterResultElement.classList.add('counter__result--hidden');
  }
}