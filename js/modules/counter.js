import Result from "./result.js";

const PhysicalActivityCoefficient = {
  MIN: 1.2,
  LOW: 1.375,
  MEDIUM: 1.55,
  HIGH: 1.725,
  MAX: 1.9,
};

const CaloriesFormulaCoefficient = {
  WEIGHT: 10,
  HEIGHT: 6.25,
  AGE: 5
};

const CaloriesFormulaMaleFemale = {
  MALE: 5,
  FEMALE: -161
};

const CaloriesFormulaMinMax = {
  COEFFICIENT: 0.15
};

export default class Counter {
  constructor(counterFormElement) {
    this.form = counterFormElement;

    this.result = new Result();
    
    this.gender = null;
    this.age = null;
    this.height = null;
    this.weight = null;
    this.activity = null;
    
    this.submit = this.form.elements.submit;
    this.reset = this.form.elements.reset;

    this._onFormInputHandler = this._onFormInputHandler.bind(this);
    this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);
    this._onFormResetHandler = this._onFormResetHandler.bind(this);
  }

  init() {
    this.form.addEventListener('input', this._onFormInputHandler);
    this.form.addEventListener('submit', this._onFormSubmitHandler);
    this.form.addEventListener('reset', this._onFormResetHandler);
  }

  getCaloriesNorm() {
    const weight = this.weight * CaloriesFormulaCoefficient.WEIGHT;
    const height = this.height * CaloriesFormulaCoefficient.HEIGHT;
    const age = this.age * CaloriesFormulaCoefficient.AGE;
    const gender = CaloriesFormulaMaleFemale[this.gender.toUpperCase()];
    const activity = PhysicalActivityCoefficient[this.activity.toUpperCase()];

    return Math.round(((weight + height - age) + gender) * activity);
  }

  getCaloriesMin() {
    return Math.round(this.getCaloriesNorm() - (this.getCaloriesNorm() * CaloriesFormulaMinMax.COEFFICIENT));
  }

  getCaloriesMax() {
    return Math.round(this.getCaloriesNorm() + (this.getCaloriesNorm() * CaloriesFormulaMinMax.COEFFICIENT));
  }

  _onFormInputHandler() {
    this.reset.disabled = !(this.age || this.height || this.weight);
    this.submit.disabled = !this.form.checkValidity();

    this.age = this.form.elements.age.value;
    this.height = this.form.elements.height.value;
    this.weight = this.form.elements.weight.value;
    this.gender = this.form.elements.gender.value;
    this.activity = this.form.elements.activity.value;
  }

  _onFormSubmitHandler(evt) {
    evt.preventDefault();
    const caloriesData = {
      norm: this.getCaloriesNorm(),
      min: this.getCaloriesMin(),
      max: this.getCaloriesMax()
    };
    this.result.show(caloriesData);
  }

  _onFormResetHandler() {
    this.reset.disabled = true;
    this.submit.disabled = true;
    this.result.hide();
  }
}