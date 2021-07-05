import { BaseComponent } from './components/baseComponent';
import { Header } from './components/header/header';

export class App extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement | null) {
    super('div', ['app']);
  }

  render() {
    // this.rootElement?.appendChild(this.element);
    this.rootElement?.appendChild(new Header(document.body).render());
    return this.element;
  }
}
