import { settings } from '../appSettings';

export function changeGameMode() {
  if (settings.gameMode === 'train') {
    settings.gameMode = 'play';
    document.dispatchEvent(new CustomEvent('switchedToPlayMode'));
  } else {
    settings.gameMode = 'train';
    document.dispatchEvent(new CustomEvent('switchedToTrainMode'));
  }
  console.log(`game mode is now ${settings.gameMode}`);
}

function trainMode() {
  const changeModeButton = document.querySelector('.btn-change-mode') as HTMLElement;
  changeModeButton.innerText = 'Train Mode';
  const playButton = document.querySelector('.btn-play') as HTMLElement;
  const restartButton = document.querySelector('.btn-restart') as HTMLElement;
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
  }
}

function playMode() {
  const changeModeButton = document.querySelector('.btn-change-mode') as HTMLElement;
  changeModeButton.innerText = 'Play Mode';
  // show game control buttons
  const playButton = document.querySelector('.btn-play') as HTMLElement;
  const restartButton = document.querySelector('.btn-restart') as HTMLElement;
  const pointsPanel = document.querySelector('.control-panel__points') as HTMLElement;
  playButton.classList.remove('hidden');
  restartButton.classList.remove('hidden');
  pointsPanel.classList.remove('hidden');
  // remove controls from cards
  if (window.location.hash !== '#main') {
    const cardsDescriptionFields = document.querySelectorAll('.card__text');
    cardsDescriptionFields.forEach((element) => element.classList.add('hidden'));
    const cardsRotationButtons = document.querySelectorAll('.card__rotate');
    cardsRotationButtons.forEach((element) => element.classList.add('hidden'));
  }
}

document.addEventListener('switchedToTrainMode', () => trainMode());
document.addEventListener('switchedToPlayMode', () => playMode());
