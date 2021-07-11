import { BaseComponent } from './components/baseComponent';
import { Header } from './components/header/header';
import { ControlPanel } from './components/controlPanel/controlPanel';
import { CardField } from './components/cardField/cardField';
import { renderFooter } from './components/footer/footer';

export class App extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement | null) {
    super('div', ['app']);
  }

  render(): HTMLElement {
    // this.rootElement?.appendChild(this.element);
    this.rootElement?.appendChild(new Header(document.body).render());
    const main = new BaseComponent('main', ['main']);
    main.element.appendChild(new ControlPanel(document.body).render());
    main.element.appendChild(new CardField(document.body).render());
    main.element.appendChild(renderFooter());
    // this.rootElement?.appendChild(new ControlPanel(document.body).render());
    this.rootElement?.appendChild(main.render());
    return this.element;
  }
}
