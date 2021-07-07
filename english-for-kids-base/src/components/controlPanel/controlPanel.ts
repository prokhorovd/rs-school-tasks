import './controlPanel.css';
import { BaseComponent } from '../baseComponent';

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
    const restartBtn = new BaseComponent('button', ['btn', 'btn-restart']);
    restartBtn.element.innerText = 'Restart';
    restartBtn.element.classList.add('hidden');
    this.element.appendChild(playBtn.render());
    this.element.appendChild(restartBtn.render());
    // game points field
    const pointsField = new BaseComponent('div', ['control-panel__points']);
    pointsField.element.innerText = 'Points';
    this.element.appendChild(pointsField.render());
  }

  render(): HTMLElement {
    this.rootElement?.appendChild(this.element);
    return super.render();
  }
}
