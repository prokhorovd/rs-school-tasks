import { generateCategoryCards } from './components/categoryCards/categoryCards';
import { categoriesList, settings } from './appSettings';
import { generateWordCards } from './components/wordCards/wordCards';
import {resetGame} from "./components/game/game";

export const drawWordCards = function () {
  const cardField = document.querySelector('.card-field') as HTMLElement;
  const pageHeading = document.querySelector('.control-panel__heading') as HTMLElement;
  cardField.innerHTML = '';
  // перебираем через список категорий
  for (let i = 0; i < categoriesList.length; i++) {
    if (categoriesList[i].link === window.location.hash) {
      pageHeading.innerText = categoriesList[i].name;
      // генерируем карты для категории и рисуем на странице
      generateWordCards(i, cardField);
    }
  }
};

export function setRouting(rootElement: Window) {
  rootElement.addEventListener('hashchange', () => {
    const cardField = document.querySelector('.card-field') as HTMLElement;
    const pageHeading = document.querySelector('.control-panel__heading') as HTMLElement;
    if (window.location.hash === '#main') {
      // console.log('main page');
      cardField.innerHTML = '';
      pageHeading.innerText = 'Main Page';
      generateCategoryCards(categoriesList, cardField);
    } else {
      // cardField.innerHTML = '';
      // // перебираем через список категорий
      // for (let i = 0; i < categoriesList.length; i++) {
      //   if (categoriesList[i].link === window.location.hash) {
      //     // console.log('founded, its', categoriesList[i].link);
      //     // console.log('category number is ', i);
      //     pageHeading.innerText = categoriesList[i].name;
      //     // генерируем карты для категории и рисуем на странице
      //     generateWordCards(i, cardField);
      //   }
      // }
      drawWordCards();
      resetGame();
    }
  });
}
