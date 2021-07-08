// генерируем все карты из категории используя генератор карт wordCard
import { cardsList } from '../../appSettings';
import { generateWordCard } from './wordCard';

export function generateWordCards(categoryNumber: number, rootElement: HTMLElement | null) {
  for (let i = 0; i < cardsList[categoryNumber].length; i++) {
    const newlyGenCard = generateWordCard(cardsList[categoryNumber][i]);
    rootElement?.appendChild(newlyGenCard);
  }
}
