export const languageItems = document.querySelectorAll('.language-select__item');
export const navBtns = document.querySelectorAll('.item-nav');
export const root = document.querySelector('.main');

export const quiz = {
  button: {
    en: 'next level',
    ru: 'следующий уровень'
  },
  plug: {
    en: 'Listen to the player.\n Select a bird from the list',
    ru: 'Послушайте плеер.\n Выберите птицу из списка'
  }
}

export const nav = {
  en: ['about game', 'quiz', 'gallery'],
  ru: ['об игре', 'викторина', 'галерея']
}
export const score = {
  en: 'score',
  ru: 'баллы'
}
export const rules = {
  title: {
    en: `Hello, my friend!\n Welcome to the bird quiz.`,
    ru: `Привет, мой друг!\n Добро пожаловать на викторину, посвященную птицам.`
  },
  rule: {
    en: [
      'The bird in the block with the question is chosen randomly',
      'When you click on the answer option with the name of the bird, information about it is displayed in the block with the description of the bird',
      'If the player has chosen the correct answer, the name and image of the bird are displayed in the question block',
      'At the beginning of the game, the number of points is 0. If the player gave the correct answer on the first attempt, his score increases by 5 points, each next attempt gives one point less, if the correct answer is given only on the last, sixth attempt, the player receives 0 points for him. Points for all questions are summed up.',
      'When the player gave the correct answer, the "Next" button is activated and he gets the opportunity to move on to the next question'
    ],
    ru: [
      'Птица в блоке с вопросом выбирается рандомно',
      'При клике по варианту ответа с названием птицы, в блоке с описанием птицы выводятся информация о ней',
      'Если игрок выбрал правильный ответ, в блоке с вопросом выводится название и изображение птицы',
      'В начале игры количество баллов 0. Если игрок дал правильный ответ с первой попытки, его счёт увеличивается на 5 баллов, каждая следующая попытка даёт на один балл меньше, если правильный ответ дан только с последней, шестой попытки, игрок получает за него 0 баллов. Баллы за все вопросы суммируются',
      'Когда игрок дал правильный ответ, активируется кнопка "Дальше" и он получает возможность перейти к следующему вопросу'
    ]
  },
  button: {
    en: 'Start the Game',
    ru: 'Начать игру'
  }
}

export const birdsСategories = {
  en: [
    'Warm-Up',
    'Sparrows',
    'Forest birds',
    'Songbirds',
    'Predator birds',
    'Sea birds'
  ],
  ru: [
    'Разминка',
    'Воробьиные',
    'Лесные птицы',
    'Певчие птицы',
    'Хищные птицы',
    'Морские птицы'
  ]
}



