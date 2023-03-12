import { addElement } from './newElement';

export class Result {
  constructor() {
    this.root = document.createElement('div');
    this.root.className = 'result';
    this.container = addElement('div', ['container'], this.root);
    this.wrapper = addElement('div', ['result__wrapper'], this.container);
    this.title = addElement('h2', ['result__title'], this.wrapper);
    this.notification = addElement('p', ['result__notification'], this.wrapper);
    this.button = addElement('button', ['result__btn'], this.wrapper);
  }
  addTextContent(lang, score) {
    if (lang === 'en') {
      this.title.innerHTML = 'Congratulations!';
      this.notification.innerHTML = `You passed the quiz and scored ${score} out of 30 possible points`;
      this.button.innerHTML = 'Play again';
    }
    else if (lang === 'ru') {
      this.title.innerHTML = 'Поздравляем!';
      this.notification.innerHTML = `Вы прошли викторину и набрали ${score} из 30 возможных баллов`;
      this.button.innerHTML = 'Сыграть еще раз!';
    }
  }
}