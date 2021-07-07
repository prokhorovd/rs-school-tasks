import './cardField.css';
import { BaseComponent } from '../baseComponent';
import { categoriesList } from '../../appSettings';
import { generateCategoryCards } from '../categoryCards/categoryCards';

export class CardField extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement | null) {
    super('div', ['card-field']);
    generateCategoryCards(categoriesList, this.element);
  }

  render(): HTMLElement {
    this.rootElement?.appendChild(this.element);
    return super.render();
  }
}
