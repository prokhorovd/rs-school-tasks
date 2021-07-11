import { generateCategoryCards } from './components/categoryCards/categoryCards';
import { categoriesList } from './appSettings';
import { generateWordCards } from './components/wordCards/wordCards';
import { resetGame } from './components/game/game';
import { BaseComponent } from './components/baseComponent';
import {createTable} from "./components/stats/stats";

export const drawWordCards = (): void => {
  const cardField = document.querySelector('.card-field') as HTMLElement;
  const cardFieldRow = new BaseComponent('div', ['card-field__row', 'row', 'justify-content-around']);
  const pageHeading = document.querySelector('.control-panel__heading') as HTMLElement;
  cardField.innerHTML = '';
  // перебираем через список категорий
  for (let i = 0; i < categoriesList.length; i++) {
    if (categoriesList[i].link === window.location.hash) {
      pageHeading.innerText = categoriesList[i].name;
      // генерируем карты для категории и рисуем на странице
      generateWordCards(i, cardFieldRow.element);
    }
  }
  cardField.appendChild(cardFieldRow.render());
};

export function setRouting(rootElement: Window): void {
  rootElement.addEventListener('hashchange', () => {
    // set active link in sidebar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((element) => {
      if (element.getAttribute('href') === window.location.hash) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
    // draw page
    const cardField = document.querySelector('.card-field') as HTMLElement;
    const pageHeading = document.querySelector('.control-panel__heading') as HTMLElement;
    const restartButton = document.querySelector('.btn-repeat') as HTMLElement;
    restartButton.classList.add('hidden');
    if (window.location.hash === '#main') {
      // console.log('main page');
      const rowCardWrapper = new BaseComponent('div', ['card-field__row', 'row', 'justify-content-around']);
      cardField.innerHTML = '';
      pageHeading.innerText = 'Main Page';
      // generateCategoryCards(categoriesList, cardField);
      generateCategoryCards(categoriesList, rowCardWrapper.element);
      cardField.appendChild(rowCardWrapper.render());
    } else if (window.location.hash === '#stats') {
      cardField.innerHTML = '';
      pageHeading.innerText = 'Statistics';
      cardField.appendChild(createTable());
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
