import { addElement } from './newElement';

export class Gallery {
  constructor() {
    this.root = document.createElement('section');
    this.root.className = 'gallery';

    this.container = addElement('div', ['container'], this.root);
    this.wrapper = addElement('div', ['gallery__wrapper'], this.container);
    this.player = addElement('div', ['gallery__player', 'gallery-player'], this.wrapper);
    this.birdName = addElement('p', ['gallery-player__bird-name'], this.player);
    this.playerWrapper = addElement('div', ['gallery-player__wrapper'], this.player);
    this.playBtn = addElement('span', ['gallery-player__play-btn', 'material-icons', 'play-btn'], this.playerWrapper);
    this.playBtn.innerHTML = 'play_arrow';
    this.timeline = addElement('div', ['gallery-player__timeline'], this.playerWrapper);
    this.progress = addElement('div', ['gallery-player__progress'], this.timeline);
    this.time = addElement('div', ['gallery-player__time'], this.timeline);
    this.currentDuration = addElement('span', ['gallery-player__current-duration'], this.time);
    this.currentDuration.innerHTML = '00:00';
    this.totalDuration = addElement('span', ['gallery-player__total-duration'], this.time);
    this.totalDuration.innerHTML = 'Loading...';
    this.volume = addElement('div', ['gallery-player__volume'], this.player);
    this.volumeMute = addElement('span', ['gallery-player__mute', 'material-icons'], this.volume);
    this.volumeMute.innerHTML = 'volume_up';
    this.volumeSlider = addElement('div', ['gallery-player__volume-slider'], this.volume);
    this.volumePercentage = addElement('div', ['gallery-player__volume-percentage'], this.volumeSlider);

    this.cardList = addElement('ul', ['gallery__card-list', 'card-list'], this.wrapper);
    this.cards = [];
  }

  createCards(list) {
    const data = list.flat();
    for (let i = 0; i < data.length; i++) {
      const card = addElement('li', ['card-list__item'], this.cardList);

      const image = new Image();
      image.src = data[i].image;
      image.className = 'card-list__image';
      card.append(image);

      const cardInfo = addElement('div', ['card-list__info'], card);
      const cardPlayer = addElement('div', ['card-list__player'], cardInfo);
      const cardBtn = addElement('span', ['card-list__play-btn', 'play-btn', 'material-icons'], cardPlayer);
      cardBtn.innerHTML = 'play_arrow';
      cardBtn.setAttribute('data-item', i);

      this.cards.push(card);
      addElement('h4', ['card-list__name'], cardPlayer);
      addElement('p', ['card-list__description'], cardInfo);
    }
  }

  addTextContent(list) {
    const data = list.flat();
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].querySelector('.card-list__name').innerHTML = data[i].name;
      this.cards[i].querySelector('.card-list__description').innerHTML = data[i].description;
    }
  }
}
