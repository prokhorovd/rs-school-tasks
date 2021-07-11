import { cardsList, categoriesList, gameData } from '../../appSettings';
// import { drawWordCards } from '../../routing';
import { BaseComponent } from '../baseComponent';
import { generateWordCards } from '../wordCards/wordCards';
import './game.css';
import { updateCorrectCounter, updateErrorCounter } from '../stats/stats';

export const sayWord = (): void => {
  const currentCard = gameData.shuffledCardsOrder[gameData.currentStep];
  const wordAudio = new Audio(cardsList[gameData.currentCategory][currentCard].audioSrc);
  wordAudio.play();
};

const nextCard = () => {
  gameData.currentStep += 1;
  sayWord();
};

const renderWinScreen = (): HTMLElement => {
  const winScreen = new BaseComponent('div', ['win-screen']);
  const winIcon = new BaseComponent('div', ['win-screen__icon']);
  const winText = new BaseComponent('div', ['win-screen__text']);
  winText.element.innerText = 'Good job! There were no mistakes';
  winScreen.element.appendChild(winIcon.render());
  winScreen.element.appendChild(winText.render());
  return winScreen.render();
};

const renderLoseScreen = (mistakesCounter: number): HTMLElement => {
  const loseScreen = new BaseComponent('div', ['lose-screen']);
  const loseIcon = new BaseComponent('div', ['lose-screen__icon']);
  const loseText = new BaseComponent('div', ['lose-screen__text']);
  loseText.element.innerText = `You lost, try again! You were made ${mistakesCounter} mistakes`;
  loseScreen.element.appendChild(loseIcon.render());
  loseScreen.element.appendChild(loseText.render());
  return loseScreen.render();
};

// todo end game screen (success or not)
const endGame = (): void => {
  const gameField = document.querySelector('.card-field') as HTMLElement;
  const resultScreen = new BaseComponent('div', ['result-screen']);
  if (gameData.mistakesCounter === 0) {
    const winSound = new Audio('./audio/success.mp3');
    winSound.play();
    // resultScreen.element.innerText = 'success, there were no mistakes';
    // console.log('success');
    resultScreen.element.appendChild(renderWinScreen());
  } else {
    // console.log('failure');
    const loseSound = new Audio('./audio/failure.mp3');
    loseSound.play();
    // resultScreen.element.innerText = `failure, there was/were ${gameData.mistakesCounter} mistakes`;
    resultScreen.element.appendChild(renderLoseScreen(gameData.mistakesCounter));
    // console.log(`there was/were ${gameData.mistakesCounter} mistakes`);
  }
  gameField.innerHTML = '';
  gameField.appendChild(resultScreen.render());
  const repeatBtn = document.querySelector('.btn-repeat') as HTMLElement;
  repeatBtn.classList.add('hidden');
  setTimeout(() => {
    window.location.hash = '#main';
  }, 3000);
};

const drawStar = (guessed: boolean) => {
  const pointsField = document.querySelector('.control-panel__points') as HTMLElement;
  const star = new BaseComponent('span', ['point-star']);
  if (guessed) {
    // console.log('guessed');
    star.element.classList.add('point-star-true');
  } else {
    // console.log('not guessed');
    star.element.classList.add('point-star-false');
  }
  pointsField.appendChild(star.render());
};

const checkCard = (id: string) => {
  // console.log('check card was pressed');
  const currentCard = gameData.shuffledCardsOrder[gameData.currentStep];
  // если пользователь кликает по названной карте
  if (id === cardsList[gameData.currentCategory][currentCard].word) {
    // console.log('match');
    gameData.guessCounter += 1;
    updateCorrectCounter(id, categoriesList[gameData.currentCategory].link);
    const guessedCard = document.getElementById(id) as HTMLElement;
    guessedCard.classList.add('guessed');
    const greenFilter = new BaseComponent('div', ['guessed-div']);
    guessedCard.children[0].appendChild(greenFilter.render());
    // console.log(guessedCard);
    // const cardId = guessedCard.id;
    // guessedCard.removeEventListener('click', () => checkCard(cardId));
    // sound of match
    const matchSound = new Audio('./audio/correct.mp3');
    matchSound.play();
    drawStar(true);
    // console.log(gameData.currentStep, gameData.cardsInCategory);
    if (gameData.currentStep < gameData.cardsInCategory - 1) {
      matchSound.onended = () => {
        nextCard();
      };
    } else {
      endGame();
    }
  } else {
    // console.log('mistake');
    gameData.mistakesCounter += 1;
    const mistakenCard = cardsList[gameData.currentCategory][currentCard].word;
    updateErrorCounter(mistakenCard, categoriesList[gameData.currentCategory].link);
    // sound of error
    const errorSound = new Audio('./audio/error.mp3');
    errorSound.play();
    drawStar(false);
  }
};

const resetPointsField = () => {
  const pointsField = document.querySelector('.control-panel__points') as HTMLElement;
  pointsField.innerHTML = '';
};

const drawField = (): void => {
  const cardField = document.querySelector('.card-field') as HTMLElement;
  const rowCardWrapper = new BaseComponent('div', ['card-field__row', 'row', 'justify-content-around']);
  const pageHeading = document.querySelector('.control-panel__heading') as HTMLElement;
  cardField.innerHTML = '';
  // перебираем через список категорий
  for (let i = 0; i < categoriesList.length; i++) {
    if (categoriesList[i].link === window.location.hash) {
      pageHeading.innerText = categoriesList[i].name;
      // генерируем карты для категории и рисуем на странице
      generateWordCards(i, rowCardWrapper.element);
    }
  }
  cardField.appendChild(rowCardWrapper.render());
};

export const resetGame = (): void => {
  gameData.currentCategory = 0;
  gameData.guessCounter = 0;
  gameData.mistakesCounter = 0;
  gameData.cardsInCategory = 8;
  gameData.currentStep = 0;
  gameData.shuffledCardsOrder = [];
  resetPointsField();
  drawField();
  // drawWordCards();
};

export function startGame(): void {
  // todo сброс состояния игры
  resetGame();
  // показать состояние игры
  // console.log(Object.values(gameData));
  // // определим текущую категорию
  for (let i = 0; i < categoriesList.length; i++) {
    if (categoriesList[i].link === window.location.hash) {
      // console.log('founded, its', categoriesList[i].link);
      // console.log('category number is ', i);
      gameData.currentCategory = i;
    }
  }
  // составим перемешанный список номеров - порядок в котором будем называть слова.
  const cardsOrder = [];
  for (let i = 0; i < cardsList[gameData.currentCategory].length; i++) {
    cardsOrder.push(i);
  }
  gameData.shuffledCardsOrder = cardsOrder.sort(() => Math.random() - 0.5);
  // console.log('shuffled cards order is: ', gameData.shuffledCardsOrder);
  // // называем слово
  sayWord();
  // добавим листенеры
  const cardsOnPage = document.querySelectorAll('.card__item');
  cardsOnPage.forEach((element) => {
    const cardId = element.id;
    element.addEventListener('click', () => checkCard(cardId));
  });
  const playBtn = document.querySelector('.btn-play') as HTMLElement;
  const repeatBtn = document.querySelector('.btn-repeat') as HTMLElement;
  playBtn.classList.add('hidden');
  repeatBtn.classList.remove('hidden');
}
