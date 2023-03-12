import { addElement } from './newElement';
import birdsDataEn from './birdsDataEn';
import birdsDataRu from './birdsDataRu';

export class BirdCard {
  constructor(parent) {
    this.wrapper = addElement('div', ['card__wrapper'], parent);
    this.header = addElement('div', ['card__header'], this.wrapper);
    this.info = addElement('div', ['card__info'], this.header);
    this.name = addElement('h4', ['card__name'], this.info);
    this.latinName = addElement('p', ['card__latin-name'], this.info);
    this.player = addElement('div', ['card__player'], this.info);
    this.playBtn = addElement('span', ['card__play-pause-btn', 'play-btn', 'material-icons'], this.player);
    this.playBtn.innerHTML = 'play_arrow';
    this.timeline = addElement('div', ['card__timeline'], this.player);
    this.progress = addElement('div', ['card__progress'], this.timeline);
    this.currentDuration = addElement('span', ['card__current-duration'], this.timeline);
    this.currentDuration.innerHTML = '00:00';
    this.totalDuration = addElement('span', ['card__total-duration'], this.timeline);
    this.totalDuration.innerHTML = 'Loading...';
    this.description = addElement('p', ['card__description'], this.wrapper);
    this.volume = addElement('div', ['card__volume'], this.info);

    this.volumeBtn = addElement('span', ['card__volume-mute', 'material-icons'], this.volume);
    this.volumeBtn.innerHTML = 'volume_up';
    this.volumeSlider = addElement('div', ['card__volume-slider'], this.volume);
    this.volumePercentage = addElement('div', ['card__volume-percentage'], this.volumeSlider);
  }

  addTextContent(lang, lvl, answer) {
    const data = lang === 'en' ? birdsDataEn : birdsDataRu;
    this.name.innerHTML = data[lvl][answer].name;
    this.latinName.innerHTML = data[lvl][answer].species;
    this.description.innerHTML = data[lvl][answer].description;
  }
}