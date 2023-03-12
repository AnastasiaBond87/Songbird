import plugBird from '.././assets/img/plugBird.jpg';
import { addElement } from './newElement';

export class MainPlayer {
  constructor() {
    this.player = document.createElement('div');
    this.player.className = 'quiz__main-player main-player';

    this.img = addElement('img', ['main-player__img'], this.player, { src: plugBird, alt: 'Bird' });

    this.controls = addElement('div', ['main-player__controls'], this.player);
    this.answer = addElement('h4', ['main-player__answer'], this.controls);
    this.answer.innerHTML = '******';
    this.play = addElement('div', ['main-player__play'], this.controls);
    this.playBtn = addElement('span', ['main-player__play-pause-btn', 'play-btn', 'material-icons'], this.play);
    this.playBtn.innerHTML = 'play_arrow';
    this.timeline = addElement('div', ['main-player__timeline'], this.play);
    this.progress = addElement('div', ['main-player__progress'], this.timeline);
    this.currentDuration = addElement('span', ['main-player__current-duration'], this.timeline);
    this.currentDuration.innerHTML = '00:00';
    this.totalDuration = addElement('span', ['main-player__total-duration'], this.timeline);
    this.totalDuration.innerHTML = 'Loading...';
    this.volume = addElement('div', ['main-player__volume'], this.controls);
    this.volumeBtn = addElement('span', ['main-player__volume-mute', 'material-icons'], this.volume);
    this.volumeBtn.innerHTML = 'volume_up';
    this.volumeSlider = addElement('div', ['main-player__volume-slider'], this.volume);
    this.volumePercentage = addElement('div', ['main-player__volume-percentage'], this.volumeSlider);
  }

  addPlayer(parent) {
    parent.append(this.player);
  }
}