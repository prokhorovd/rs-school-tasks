// генерирует одну карту категорий
import { BaseComponent } from '../baseComponent';

export function generateCategoryCard(categoryName: string, categoryLink: string, picturePath: string): HTMLElement {
  const newCard = new BaseComponent('div', ['category-card']);
  const newCardImage = new BaseComponent('img', ['category-card__img']);
  newCardImage.element.setAttribute('src', `${picturePath}`);
  newCardImage.element.setAttribute('alt', `${categoryName}`);
  newCard.element.appendChild(newCardImage.render());
  // link and text
  const newCardDescription = new BaseComponent('a', ['category-card__link']);
  newCardDescription.element.setAttribute('href', `${categoryLink}`);
  newCardDescription.element.innerText = `${categoryName}`;
  newCard.element.appendChild(newCardDescription.render());
  // set click listener to all block
  newCard.element.addEventListener('click', () => {
    window.location.hash = `${categoryLink}`;
  });
  return newCard.render();
}
