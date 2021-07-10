import './controlPanel.css';
import { BaseComponent } from '../baseComponent';
import { sayWord, startGame } from '../game/game';
import { settings } from '../../appSettings';

function toggleGameButtons() {
  const playButton = document.querySelector('.btn-play') as HTMLElement;
  const restartButton = document.querySelector('.btn-repeat') as HTMLElement;
  const pointsPanel = document.querySelector('.control-panel__points') as HTMLElement;
  if (settings.gameMode === 'play' && window.location.hash !== '#main') {
    playButton.classList.remove('hidden');
    // restartButton.classList.remove('hidden');
    pointsPanel.classList.remove('hidden');
  } else {
    playButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    pointsPanel.classList.add('hidden');
  }
}

export class ControlPanel extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement | null) {
    super('div', ['control-panel']);
    // page name
    const pageName = new BaseComponent('div', ['control-panel__heading']);
    pageName.element.innerText = 'Main Page';
    this.element.appendChild(pageName.render());
    // play/restart buttons
    const playBtn = new BaseComponent('button', ['btn', 'btn-play']);
    playBtn.element.innerText = 'Play';
    playBtn.element.classList.add('hidden');
    playBtn.element.addEventListener('click', startGame);
    const restartBtn = new BaseComponent('button', ['btn', 'btn-repeat']);
    restartBtn.element.innerText = 'Repeat';
    restartBtn.element.classList.add('hidden');
    restartBtn.element.addEventListener('click', () => {
      // resetGame();
      // startGame();
      sayWord();
    });
    this.element.appendChild(playBtn.render());
    this.element.appendChild(restartBtn.render());
    // game points field
    const pointsField = new BaseComponent('div', ['control-panel__points']);
    // pointsField.element.innerText = 'Points';
    pointsField.element.classList.add('hidden');
    this.element.appendChild(pointsField.render());
    // todo show or hide buttons
    window.addEventListener('hashchange', toggleGameButtons);
  }

  render(): HTMLElement {
    this.rootElement?.appendChild(this.element);
    return super.render();
  }
}
