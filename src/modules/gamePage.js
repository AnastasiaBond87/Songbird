import { addElement } from './newElement';
import { birdsСategories, quiz, score } from './constants';
import birdsDataEn from './birdsDataEn';
import birdsDataRu from './birdsDataRu';




export class GamePage {
  constructor(lang, lvl) {
    // template
    this.root = document.createElement('section');
    this.root.classList.add('quiz');
    this.container = addElement('div', ['container'], this.root);
    this.wrapper = addElement('div', ['quiz__wrapper'], this.container);

    // score output
    this.score = addElement('div', ['quiz__score', 'score'], this.wrapper);
    this.scoreLabel = addElement('span', ['score__label'], this.score);
    this.scoreOutput = addElement('span', ['score__output'], this.score);
    this.scoreOutput.innerHTML = '0';

    //questions list
    this.levelsList = addElement('ul', ['quiz__levels', 'levels'], this.wrapper);
    this.levels = [];
    for (let i = 0; i < 6; i++) {
      const item = addElement('li', ['levels__item'], this.levelsList);
      this.levels.push(item);
    }

    // create player
    this.player = addElement('div', ['quiz__player'], this.wrapper);

    // create section for answers list and bird's card
    this.gameField = addElement('div', ['game-field'], this.wrapper);
    this.choice = addElement('div', ['game-filed__choice', 'choice'], this.gameField);
    this.choiceList = addElement('ul', ['choice-list'], this.choice);
    this.cardField = addElement('div', ['game-field__card', 'card', 'card-game'], this.gameField)
    this.gameButton = addElement('button', ['quiz__btn'], this.wrapper);

    this.addTextPlug();
    this.addAnswerOptions(lang, lvl);
    this.addTextContent(lang);
    this.setActiveLevel(lvl);
  }

  addTextContent(lang) {
    for (let i = 0; i < this.levels.length; i++) {
      this.levels[i].innerHTML = birdsСategories[lang][i];
    }
    if (this.cardPlug) {
      this.cardPlug.innerHTML = quiz.plug[lang];
    }
    this.scoreLabel.innerHTML = `${score[lang]}: `;
    this.gameButton.innerHTML = quiz.button[lang];
  }
  setActiveLevel(lvl) {
    this.levels.forEach((el, index) => {
      if (index === lvl) {
        el.classList.add('levels-item-active');
      }
      else {
        el.classList.remove('levels-item-active');
      }
    })
  }

  addAnswerOptions(lang, lvl) {
    const data = lang === 'en' ? birdsDataEn : birdsDataRu;
    this.answers = [];
    this.choiceList.innerHTML = '';
    for (let i = 0; i < data[lvl].length; i++) {
      const item = addElement('li', ['choice-list__item'], this.choiceList, { 'data-id': data[lvl][i].id });
      item.innerHTML = data[lvl][i].name;
      this.answers.push(item);
    }
  }
  changeAnswerLanguage(lang, lvl) {
    const data = lang === 'en' ? birdsDataEn : birdsDataRu;
    for (let i = 0; i < this.answers.length; i++) {
      this.answers[i].innerHTML = data[lvl][i].name;
    }
  }
  addTextPlug() {
    this.cardPlug = addElement('p', ['card-game__plug'], this.cardField);
  }
}

