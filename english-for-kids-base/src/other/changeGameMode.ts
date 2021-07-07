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
  playButton.classList.add('hidden');
  restartButton.classList.add('hidden');
}

function playMode() {
  const changeModeButton = document.querySelector('.btn-change-mode') as HTMLElement;
  changeModeButton.innerText = 'Play Mode';
  // show game control buttons
  const playButton = document.querySelector('.btn-play') as HTMLElement;
  const restartButton = document.querySelector('.btn-restart') as HTMLElement;
  playButton.classList.remove('hidden');
  restartButton.classList.remove('hidden');
  // todo remove controls from cards
}

document.addEventListener('switchedToTrainMode', () => trainMode());
document.addEventListener('switchedToPlayMode', () => playMode());
