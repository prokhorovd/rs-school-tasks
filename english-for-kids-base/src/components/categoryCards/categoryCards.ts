// перебираем через лист категорий и генерируем карты на его основе
import { categoriesList, Category } from '../../appSettings';
import { generateCategoryCard } from './categoryCard';

export function generateCategoryCards(categoriesListArray: Category[], rootElement: HTMLElement | null): void {
  for (let i = 0; i < categoriesListArray.length; i++) {
    const newlyGenCard = generateCategoryCard(categoriesList[i].name, categoriesList[i].link, categoriesList[i].image);
    rootElement?.appendChild(newlyGenCard);
  }
}
