import { addElement } from './newElement';
import { rules } from './constants';

export class StartPage {
  constructor(lang) {
    this.root = document.createElement('section');
    this.root.classList.add('start-page');
    this.container = addElement('div', ['container'], this.root);
    this.wrapper = addElement('div', ['start-page__wrapper'], this.container);
    this.title = addElement('h3', ['start-page__title'], this.wrapper);
    this.rulesList = addElement('ul', ['start-page__rules'], this.wrapper);
    this.rules = [];
    for (let i = 0; i < 5; i++) {
      const item = addElement('li', ['rules__item'], this.rulesList);
      this.rules.push(item);
    }
    this.button = addElement('button', ['start-page__btn'], this.wrapper);
    this.addTextContent(lang);
  }

  addTextContent(lang) {
    this.button.innerHTML = rules.button[lang];
    this.title.innerHTML = rules.title[lang];
    for (let i = 0; i < this.rules.length; i++) {
      this.rules[i].innerHTML = rules.rule[lang][i];
    }
  }
}
