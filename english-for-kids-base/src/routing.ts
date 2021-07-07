import {generateCategoryCards} from "./components/categoryCards/categoryCards";
import {categoriesList} from "./appSettings";

export function setRouting(rootElement: Window) {
  rootElement.addEventListener('hashchange', () => {
    // console.log(window.location.hash);
    const cardField = document.querySelector('.card-field') as HTMLElement;
    if (window.location.hash === '#main') {
      console.log('main page');
      cardField.innerHTML = '';
      generateCategoryCards(categoriesList, cardField);
    } else {
      cardField.innerHTML = '';
    }
  });
}
