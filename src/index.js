import './index.scss';
import './index.html';
import { selectLanguage, setMenuLanguage } from './modules/language';
import { languageItems, nav, navBtns, root } from './modules/constants';
import { StartPage } from './modules/startPage';
import { GamePage } from './modules/gamePage';
import { MainPlayer } from './modules/mainPlayer';
import { Result } from './modules/result';
import { getRandom } from './modules/random';
import { BirdCard } from './modules/birdCard';
import birdsDataEn from './modules/birdsDataEn';
import birdsDataRu from './modules/birdsDataRu';
import { addAudio, playAnswerSound, updateTime, changeCurrentTime, soundOff, setVolumeControl } from './modules/sound';
import rightAnswer from './assets/audio/rightAnswer.mp3';
import wrongAnswer from './assets/audio/wrongAnswer.mp3';
import { Gallery } from './modules/gallery';

let language = localStorage.getItem('lang') || 'en';
let isCorrectAnswer = false;
let selectedOptions = new Set();
let level = 0;
let random = getRandom(0, 5);
let currentScore = 5;
let totalScore = 0;
let finallyScore;
let newCard;
let cardNumber;
let soundNumber = 0;
let data = language === 'en' ? birdsDataEn : birdsDataRu;

const answerSound = new Audio();
const audio = new Audio();
const mainAudio = new Audio();
const galleryAudio = new Audio();
const about = new StartPage(language);
const game = new GamePage(language, level);
const gallery = new Gallery();
let player = createNewPlayer();
const result = new Result();

function loadGallery() {
  gallery.createCards(data);
  gallery.addTextContent(data);
  const playBtns = [];
  gallery.cards.forEach(el => {
    const button = el.querySelector('.card-list__play-btn');
    playBtns.push(button);
  })

  galleryAudio.volume = 0.7;
  let currentVolume = galleryAudio.volume;
  let currentVolumeWidth = `${currentVolume * 100}%`;
  gallery.volumePercentage.style.width = currentVolumeWidth;

  loadSound(data, soundNumber);

  galleryAudio.addEventListener('timeupdate', (event) => {
    updateTime(event, gallery.progress, gallery.currentDuration, gallery.playBtn, galleryAudio);
  })

  gallery.timeline.addEventListener('click', (event) => {
    changeCurrentTime(event, galleryAudio);
  })

  gallery.playBtn.addEventListener('click', () => {
    if (galleryAudio.paused) {
      playMusic();
    }
    else {
      pauseMusic();
    }
  })

  playBtns.forEach(el => {
    el.addEventListener('click', (event) => {
      playNow(event.target);
    })
  })

  gallery.volumeSlider.addEventListener('click', (event) => {
    setVolumeControl(event, galleryAudio, gallery.volumePercentage, currentVolumeWidth, gallery.volumeMute);
    currentVolume = galleryAudio.volume;
  })

  gallery.volumeMute.addEventListener('click', (event) => {
    soundOff(galleryAudio, event.target, gallery.volumePercentage, currentVolume);
  })

  function playMusic() {
    for (let i = 0; i < playBtns.length; i++) {
      playBtns[i].textContent = 'play_arrow';
    }
    gallery.playBtn.textContent = 'pause';
    playBtns[soundNumber].textContent = 'pause';
    galleryAudio.play();
  }

  function pauseMusic() {
    gallery.playBtn.textContent = 'play_arrow';
    playBtns[soundNumber].textContent = 'play_arrow';
    galleryAudio.pause();
  }

  function loadSound(arr, trackIndex) {
    const data = arr.flat();
    gallery.birdName.innerHTML = data[trackIndex].name;
    galleryAudio.src = data[trackIndex].audio;
    galleryAudio.addEventListener('loadeddata', (event) => {
      const duration = event.target.duration;
      const min = Math.floor(duration / 60).toString().padStart(2, '0');
      const sec = Math.floor(duration % 60).toString().padStart(2, '0');
      gallery.totalDuration.innerHTML = `${min}:${sec}`;
    })
  }

  function playNow(button) {
    let itemIndex = button.dataset.item;
    if (itemIndex === soundNumber && !galleryAudio.paused) {
      pauseMusic();
    }
    else {
      soundNumber = itemIndex;
      loadSound(data, soundNumber);
      playMusic();
    }
  }
}

function createNewPlayer() {
  const newPlayer = new MainPlayer();
  game.player.innerHTML = '';
  newPlayer.addPlayer(game.player);
  const src = birdsDataEn[level][random].audio;

  mainAudio.volume = 0.7;
  let currentVolume = mainAudio.volume;
  let currentVolumeWidth = `${currentVolume * 100}%`;
  newPlayer.volumePercentage.style.width = currentVolumeWidth;

  addAudio(src, newPlayer.totalDuration, newPlayer.playBtn, mainAudio);
  mainAudio.addEventListener('timeupdate', (event) => {
    updateTime(event, newPlayer.progress, newPlayer.currentDuration, newPlayer.playBtn, mainAudio);
  })

  newPlayer.timeline.addEventListener('click', (event) => {
    changeCurrentTime(event, mainAudio, newPlayer.playBtn);
  })

  newPlayer.volumeBtn.addEventListener('click', (event) => {
    soundOff(mainAudio, event.target, newPlayer.volumePercentage, currentVolume);
  })

  newPlayer.volumeSlider.addEventListener('click', (event) => {
    setVolumeControl(event, mainAudio, newPlayer.volumePercentage, currentVolumeWidth, newPlayer.volumeBtn);
    currentVolume = mainAudio.volume;
  })

  newPlayer.playBtn.addEventListener('click', () => {
    if (newCard && !audio.paused) {
      newCard.playBtn.innerHTML = 'play_arrow';
      audio.pause();
    }
  })

  return newPlayer;
}

function addNavigation() {
  const route = {
    'about': about.root,
    'game': game.root,
    'gallery': gallery.root,
    'result': result.root
  }

  onNavigate('about');


  about.button.addEventListener('click', () => {
    onNavigate('game');
    navBtns.forEach(element => {
      if (element.classList.contains('item-nav_quiz')) {
        element.classList.add('active-nav-item');
      }
      else {
        element.classList.remove('active-nav-item');
      }
    });
  });

  game.gameButton.addEventListener('click', () => {
    if (level === 5) {
      result.addTextContent(language, totalScore);
      onNavigate('result');
    }
  })

  result.button.addEventListener('click', () => {
    onNavigate('game');
  })

  navBtns.forEach(el => {
    el.addEventListener('click', () => {
      navBtns.forEach(element => { element.classList.remove('active-nav-item') });
      const path = el.dataset.path;
      onNavigate(path);
      el.classList.add('active-nav-item');
    })
  })

  function onNavigate(pathname) {
    // window.history.pushState({}, pathname, window.location.origin + pathname);
    root.innerHTML = '';
    root.append(route[pathname]);
  }
}

function changeLanguage() {
  languageItems.forEach(el => {
    el.addEventListener('click', (event) => {
      language = event.target.closest('.language-select__item').dataset.value;
      data = language === 'en' ? birdsDataEn : birdsDataRu;
      localStorage.setItem('lang', language);
      selectLanguage(language, languageItems);
      setMenuLanguage(language, navBtns, nav);
      about.addTextContent(language);
      game.addTextContent(language);
      game.changeAnswerLanguage(language, level);
      result.addTextContent(language, finallyScore);
      gallery.addTextContent(data);
      const newData = data.flat();
      gallery.birdName.textContent = newData[soundNumber].name;
      if (newCard) {
        newCard.addTextContent(language, level, cardNumber);
      }
      if (isCorrectAnswer) {
        player.answer.innerHTML = data[level][random].name;
      }
    })
  })
}

function selectAnswer() {
  game.answers.forEach(answer => {
    const target = answer;
    const targetId = Number(target.dataset.id);
    answer.addEventListener('click', () => {
      createNewCard();
      getCorrectAnswer();
    })

    function createNewCard() {
      cardNumber = targetId;
      game.cardField.innerHTML = '';

      const img = new Image();
      img.src = birdsDataEn[level][cardNumber].image;
      img.className = 'card__img';
      img.alt = 'Bird';

      newCard = new BirdCard(game.cardField);
      newCard.header.prepend(img);
      newCard.addTextContent(language, level, cardNumber);

      const src = birdsDataEn[level][cardNumber].audio;
      addAudio(src, newCard.totalDuration, newCard.playBtn, audio);

      audio.addEventListener('timeupdate', (event) => {
        updateTime(event, newCard.progress, newCard.currentDuration, newCard.playBtn, audio);
      })

      newCard.timeline.addEventListener('click', (event) => {
        changeCurrentTime(event, audio, newCard.playBtn);
      })

      audio.volume = 0.7;
      let currentVolume = audio.volume;
      let currentVolumeWidth = `${currentVolume * 100}%`;
      newCard.volumePercentage.style.width = currentVolumeWidth;

      newCard.volumeBtn.addEventListener('click', (event) => {
        soundOff(audio, event.target, newCard.volumePercentage, currentVolume);

      })

      newCard.volumeSlider.addEventListener('click', (event) => {
        setVolumeControl(event, audio, newCard.volumePercentage, currentVolumeWidth, newCard.volumeBtn);
        currentVolume = audio.volume;
      })

      newCard.playBtn.addEventListener('click', () => {
        if (!mainAudio.paused) {
          mainAudio.pause();
          player.playBtn.innerHTML = 'play_arrow';
        }
      })
    }
    function getCorrectAnswer() {
      if (!isCorrectAnswer) {
        if (targetId === random) {
          target.classList.add('correct');
          playAnswerSound(answerSound, rightAnswer);
          isCorrectAnswer = true;
          totalScore += currentScore - selectedOptions.size;
          game.scoreOutput.innerHTML = totalScore;
          game.gameButton.classList.add('quiz-btn-active');
          game.gameButton.addEventListener('click', moveNextLevel);
          mainAudio.pause();
          player.playBtn.innerHTML = 'play_arrow';
          selectedOptions = new Set();
          player.answer.innerHTML = data[level][targetId].name;
          player.img.src = data[level][targetId].image;
        }
        else {
          target.classList.add('incorrect');
          playAnswerSound(answerSound, wrongAnswer);
          selectedOptions.add(targetId);
        }
      }
    }
  })
}

function moveNextLevel(event) {
  if (level === 5) {
    finallyScore = totalScore;
    level = 0;
    totalScore = 0;
    game.scoreOutput.innerHTML = '0';
  }
  else {
    level++;
  }
  isCorrectAnswer = false;
  random = getRandom(0, 5);
  game.setActiveLevel(level);
  game.addAnswerOptions(language, level);
  selectAnswer();
  if (event) {
    event.target.classList.remove('quiz-btn-active');
    event.target.removeEventListener('click', moveNextLevel);
  }
  game.cardField.innerHTML = '';
  game.addTextPlug();
  game.addTextContent(language);
  player = createNewPlayer();
  mainAudio.pause();
  audio.pause();
}

document.addEventListener('DOMContentLoaded', () => {
  addNavigation();
  changeLanguage();
  setMenuLanguage(language, navBtns, nav);
  selectLanguage(language, languageItems);
  selectAnswer();
  loadGallery();
})












