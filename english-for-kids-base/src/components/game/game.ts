import { cardsList, categoriesList, gameData } from '../../appSettings';
import { drawWordCards } from '../../routing';
import { BaseComponent } from '../baseComponent';

export const sayWord = function () {
  const currentCard = gameData.shuffledCardsOrder[gameData.currentStep];
  const wordAudio = new Audio(cardsList[gameData.currentCategory][currentCard].audioSrc);
  wordAudio.play();
};

const nextCard = function () {
  gameData.currentStep += 1;
  sayWord();
};

// todo end game screen (success or not)
const endGame = function () {
  const gameField = document.querySelector('.card-field') as HTMLElement;
  const resultScreen = new BaseComponent('div', ['result-screen']);
  if (gameData.mistakesCounter === 0) {
    const winSound = new Audio('./audio/success.mp3');
    winSound.play();
    resultScreen.element.innerText = 'success, there were no mistakes';
    console.log('success');
  } else {
    console.log('failure');
    const loseSound = new Audio('./audio/failure.mp3');
    loseSound.play();
    resultScreen.element.innerText = `failure, there was/were ${gameData.mistakesCounter} mistakes`;
    console.log(`there was/were ${gameData.mistakesCounter} mistakes`);
  }
  gameField.innerHTML = '';
  gameField.appendChild(resultScreen.render());
  const repeatBtn = document.querySelector('.btn-repeat') as HTMLElement;
  repeatBtn.classList.add('hidden');
  const delayedRedirect = setTimeout(() => {
    window.location.hash = '#main';
  }, 3000);
};

const drawStar = function (guessed: boolean) {
  const pointsField = document.querySelector('.control-panel__points') as HTMLElement;
  const star = new BaseComponent('span', ['point-star']);
  if (guessed) {
    console.log('guessed');
    star.element.classList.add('point-star-true');
  } else {
    console.log('not guessed');
    star.element.classList.add('point-star-false');
  }
  pointsField.appendChild(star.render());
};

const checkCard = function (id: string) {
  // console.log(id);
  const currentCard = gameData.shuffledCardsOrder[gameData.currentStep];
  // если пользователь кликает по названной карте
  if (id === cardsList[gameData.currentCategory][currentCard].word) {
    console.log('match');
    gameData.guessCounter += 1;
    const guessedCard = document.getElementById(id) as HTMLElement;
    guessedCard.classList.add('guessed');
    // console.log(guessedCard);
    // const cardId = guessedCard.id;
    // guessedCard.removeEventListener('click', () => checkCard(cardId));
    // sound of match
    const matchSound = new Audio('./audio/correct.mp3');
    matchSound.play();
    drawStar(true);
    console.log(gameData.currentStep, gameData.cardsInCategory);
    if (gameData.currentStep < gameData.cardsInCategory - 1) {
      matchSound.onended = function () {
        nextCard();
      };
    } else {
      endGame();
    }
  } else {
    console.log('mistake');
    gameData.mistakesCounter += 1;
    // sound of error
    const errorSound = new Audio('./audio/error.mp3');
    errorSound.play();
    drawStar(false);
  }
};

const resetPointsField = function () {
  const pointsField = document.querySelector('.control-panel__points') as HTMLElement;
  pointsField.innerHTML = '';
};

export const resetGame = function () {
  gameData.currentCategory = 0;
  gameData.guessCounter = 0;
  gameData.mistakesCounter = 0;
  gameData.cardsInCategory = 8;
  gameData.currentStep = 0;
  gameData.shuffledCardsOrder = [];
  resetPointsField();
  drawWordCards();
};

export function startGame() {
  // todo сброс состояния игры
  resetGame();
  // показать состояние игры
  console.log(Object.values(gameData));
  // // определим текущую категорию
  for (let i = 0; i < categoriesList.length; i++) {
    if (categoriesList[i].link === window.location.hash) {
      console.log('founded, its', categoriesList[i].link);
      console.log('category number is ', i);
      gameData.currentCategory = i;
    }
  }
  // составим перемешанный список номеров - порядок в котором будем называть слова.
  const cardsOrder = [];
  for (let i = 0; i < cardsList[gameData.currentCategory].length; i++) {
    cardsOrder.push(i);
  }
  gameData.shuffledCardsOrder = cardsOrder.sort(() => Math.random() - 0.5);
  console.log('shuffled cards order is: ', gameData.shuffledCardsOrder);
  // // называем слово
  sayWord();
  // добавим листенеры
  const cardsOnPage = document.querySelectorAll('.card');
  cardsOnPage.forEach((element) => {
    const cardId = element.id;
    element.addEventListener('click', () => checkCard(cardId));
  });
  const playBtn = document.querySelector('.btn-play') as HTMLElement;
  const repeatBtn = document.querySelector('.btn-repeat') as HTMLElement;
  playBtn.classList.add('hidden');
  repeatBtn.classList.remove('hidden');
}
