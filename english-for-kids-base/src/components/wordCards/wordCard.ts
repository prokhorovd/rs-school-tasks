import { BaseComponent } from '../baseComponent';
import { Card, settings } from '../../appSettings';

function flipCard(id: string) {
  const cardElement = document.getElementById(id) as HTMLElement;
  const rotateButton = document.getElementById(`${id}-rotate`) as HTMLElement;
  cardElement.classList.add('flip');
  rotateButton.classList.add('hidden');
}

function playWord(audioSrc: string) {
  const sound = new Audio(`./${audioSrc}`);
  if (settings.gameMode === 'train') {
    sound.play();
  }
}

function unflipCard(id: string): void {
  const cardElement = document.getElementById(id) as HTMLElement;
  const rotateButton = document.getElementById(`${id}-rotate`) as HTMLElement;
  if (cardElement.classList.contains('flip')) {
    cardElement.classList.remove('flip');
    rotateButton.classList.remove('hidden');
  }
}

export function generateWordCard(card: Card): HTMLElement {
  const newlyGenCard = new BaseComponent('div', ['card-container']);
  // card
  const cardItem = new BaseComponent('div', ['card']);
  cardItem.element.setAttribute('id', `${card.word}`);
  const cardFront = new BaseComponent('div', ['card__front']);
  // click listener for audio play
  cardFront.element.addEventListener('click', () => playWord(card.audioSrc));
  const cardBack = new BaseComponent('div', ['card__back']);
  // front text
  const cardFrontText = new BaseComponent('div', ['card__text']);
  cardFrontText.element.innerText = card.word;
  if (settings.gameMode === 'play') {
    cardFrontText.element.classList.add('hidden');
  }
  cardFront.element.setAttribute('style', `background-image: url(./${card.image})`);
  cardFront.element.appendChild(cardFrontText.render());
  // back text
  const cardBackText = new BaseComponent('div', ['card__text']);
  cardBackText.element.innerText = card.translation;
  if (settings.gameMode === 'play') {
    cardBackText.element.classList.add('hidden');
  }
  cardBack.element.setAttribute('style', `background-image: url(./${card.image})`);
  cardBack.element.appendChild(cardBackText.render());
  // rotate button
  const cardRotateButton = new BaseComponent('div', ['card__rotate']);
  cardRotateButton.element.setAttribute('style', 'background-image: url(./img/rotate.svg)');
  cardRotateButton.element.setAttribute('id', `${card.word}-rotate`);
  cardRotateButton.element.addEventListener('click', () => flipCard(card.word));
  // when card is flipped and mouse moved out - flip back
  newlyGenCard.element.addEventListener('mouseleave', () => unflipCard(card.word));
  if (settings.gameMode === 'play') {
    cardRotateButton.element.classList.add('hidden');
  }
  // combine elements
  cardItem.element.appendChild(cardFront.render());
  cardItem.element.appendChild(cardBack.render());
  cardItem.element.appendChild(cardRotateButton.render());
  newlyGenCard.element.appendChild(cardItem.render());
  return newlyGenCard.render();
}
