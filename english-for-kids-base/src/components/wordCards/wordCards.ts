// генерируем все карты из категории используя генератор карт wordCard
// import { categoriesList, Category } from '../../appSettings';
// import { generateCategoryCard } from '../categoryCards/categoryCard';
//
// export function generateWordCards(categoriesListArray: Category[], rootElement: HTMLElement | null) {
//   for (let i = 0; i < categoriesListArray.length; i++) {
//     const newlyGenCard = generateCategoryCard(categoriesList[i].name, categoriesList[i].link, categoriesList[i].image);
//     rootElement?.appendChild(newlyGenCard);
//   }
// }

import { Card, cardsList } from '../../appSettings';
import { generateWordCard } from './wordCard';

export function generateWordCards(categoryNumber: number, rootElement: HTMLElement | null) {
    for (let i = 0; i < cardsList[categoryNumber].length; i++) {
      const newlyGenCard = generateWordCard(cardsList[categoryNumber][i]);
      rootElement?.appendChild(newlyGenCard);
    }
}
