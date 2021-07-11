import { categoriesList, settings } from '../appSettings';
import { resetGame } from '../components/game/game';
import { drawWordCards } from '../routing';
import { generateCategoryCards } from '../components/categoryCards/categoryCards';
import { BaseComponent } from '../components/baseComponent';

export function changeGameMode(): void {
  if (settings.gameMode === 'train') {
    settings.gameMode = 'play';
    document.dispatchEvent(new CustomEvent('switchedToPlayMode'));
  } else {
    settings.gameMode = 'train';
    document.dispatchEvent(new CustomEvent('switchedToTrainMode'));
  }
  // console.log(`game mode is now ${settings.gameMode}`);
}

function trainMode() {
  // const changeModeButton = document.querySelector('.btn-change-mode') as HTMLElement;
  // changeModeButton.innerText = 'Train Mode is active';
  document.body.classList.remove('body_play');
  document.body.classList.add('body_train');
  const playButton = document.querySelector('.btn-play') as HTMLElement;
  const restartButton = document.querySelector('.btn-repeat') as HTMLElement;
  const pointsPanel = document.querySelector('.control-panel__points') as HTMLElement;
  playButton.classList.add('hidden');
  restartButton.classList.add('hidden');
  pointsPanel.classList.add('hidden');
  // show card controls
  if (window.location.hash !== '#main') {
    const cardsDescriptionFields = document.querySelectorAll('.card__text');
    cardsDescriptionFields.forEach((element) => element.classList.remove('hidden'));
    const cardsRotationButtons = document.querySelectorAll('.card__rotate');
    cardsRotationButtons.forEach((element) => element.classList.remove('hidden'));
    drawWordCards();
  } else {
    const rowCardWrapper = new BaseComponent('div', ['card-field__row', 'row', 'justify-content-around']);
    generateCategoryCards(categoriesList, rowCardWrapper.element);
    const cardField = document.querySelector('.card-field') as HTMLElement;
    cardField.innerHTML = '';
    cardField.appendChild(rowCardWrapper.render());
  }
  // drawWordCards();
}

function playMode() {
  document.body.classList.remove('body_train');
  document.body.classList.add('body_play');
  // const changeModeButton = document.querySelector('.btn-change-mode') as HTMLElement;
  // changeModeButton.innerText = 'Play Mode is active';
  // show game control buttons
  const playButton = document.querySelector('.btn-play') as HTMLElement;
  // const restartButton = document.querySelector('.btn-repeat') as HTMLElement;
  const pointsPanel = document.querySelector('.control-panel__points') as HTMLElement;
  // playButton.classList.remove('hidden');
  // restartButton.classList.remove('hidden');
  // pointsPanel.classList.remove('hidden');
  // remove controls from cards
  if (window.location.hash !== '#main') {
    playButton.classList.remove('hidden');
    // restartButton.classList.remove('hidden');
    pointsPanel.classList.remove('hidden');
    const cardsDescriptionFields = document.querySelectorAll('.card__text');
    cardsDescriptionFields.forEach((element) => element.classList.add('hidden'));
    const cardsRotationButtons = document.querySelectorAll('.card__rotate');
    cardsRotationButtons.forEach((element) => element.classList.add('hidden'));
    resetGame();
  }
}

document.addEventListener('switchedToTrainMode', () => trainMode());
document.addEventListener('switchedToPlayMode', () => playMode());
