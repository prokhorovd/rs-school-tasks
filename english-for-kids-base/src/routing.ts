import {generateCategoryCards} from "./components/categoryCards/categoryCards";
import {cardsList, categoriesList} from "./appSettings";
import {generateWordCard} from "./components/wordCards/wordCard";
import {generateWordCards} from "./components/wordCards/wordCards";

export function setRouting(rootElement: Window) {
  rootElement.addEventListener('hashchange', () => {
    // console.log(window.location.hash);
    const cardField = document.querySelector('.card-field') as HTMLElement;
    const pageHeading = document.querySelector('.control-panel__heading') as HTMLElement;
    if (window.location.hash === '#main') {
      // console.log('main page');
      cardField.innerHTML = '';
      pageHeading.innerText = 'Main Page';
      generateCategoryCards(categoriesList, cardField);
    } else {
      cardField.innerHTML = '';
      // todo test
      // cardField.appendChild(generateWordCard(cardsList[0][0]));
      // определить номер категории
      const selectedPage = window.location.hash;
      // перебираем через список категорий
      for (let i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i].link === selectedPage) {
          console.log('founded, its', categoriesList[i].link);
          console.log('category number is ', i);
          pageHeading.innerText = categoriesList[i].name;
          generateWordCards(i, cardField);
        }
      }
      // находим совпадение хэша и ссылки
      // записываем номер категории
      // console.log(selectedPage);
      // вызвать конструктор карт для номера категории
    }
  });
}
