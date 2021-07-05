import { BaseComponent } from './components/baseComponent';
import { Header } from './components/header/header';
import { ControlPanel } from './components/controlPanel/controlPanel';

export class App extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement | null) {
    super('div', ['app']);
  }

  render() {
    // this.rootElement?.appendChild(this.element);
    this.rootElement?.appendChild(new Header(document.body).render());
    this.rootElement?.appendChild(new ControlPanel(document.body).render());
    return this.element;
  }
}
