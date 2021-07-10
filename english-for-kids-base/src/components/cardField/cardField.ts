import './cardField.css';
import { BaseComponent } from '../baseComponent';
import { categoriesList } from '../../appSettings';
import { generateCategoryCards } from '../categoryCards/categoryCards';

export class CardField extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement | null) {
    super('div', ['card-field', 'container']);
    const rowCardWrapper = new BaseComponent('div', ['card-field__row', 'row', 'justify-content-around']);
    // generateCategoryCards(categoriesList, this.element);
    generateCategoryCards(categoriesList, rowCardWrapper.element);
    this.element.appendChild(rowCardWrapper.render());
  }

  render(): HTMLElement {
    this.rootElement?.appendChild(this.element);
    return super.render();
  }
}
