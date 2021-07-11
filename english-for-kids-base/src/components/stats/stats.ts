import './stats.css';
import { cardsList, categoriesList } from '../../appSettings';
import { BaseComponent } from '../baseComponent';

interface Word {
  category: string,
  categoryNumber: number,
  categoryLink: string,
  word: string,
  translation: string,
  clickCounter: number,
  correctCounter: number,
  errorCounter: number,
  guessPercent: number,
}

export const createDictionary = (): Array<Word> => {
  const dictionary: Array<Word> = [];
  for (let i = 0; i < categoriesList.length; i++) {
    const categoryName = categoriesList[i].name;
    const categoryNumber = categoriesList[i].categoryNo;
    const categoryLink = categoriesList[i].link;
    const categoryWordCount = cardsList[categoryNumber].length;
    for (let j = 0; j < categoryWordCount; j++) {
      const newDictItem: Word = {
        category: `${categoryName}`,
        categoryNumber,
        categoryLink,
        word: cardsList[categoryNumber][j].word,
        translation: cardsList[categoryNumber][j].translation,
        clickCounter: 0,
        correctCounter: 0,
        errorCounter: 0,
        guessPercent: 0,
      };
      dictionary.push(newDictItem);
    }
  }
  // console.log(dictionary);
  return dictionary;
};

const writeDictionaryToStorage = (dictionary: Array<Word>) => {
  dictionary.forEach((element) => {
    const elementStorageKey = element.word + element.categoryLink;
    const elementStorageValue = JSON.stringify(element);
    // console.log(elementStorageKey, JSON.stringify(element));
    if (localStorage.getItem(elementStorageKey) === null) {
      localStorage.setItem(elementStorageKey, elementStorageValue);
    }
  });
};

export const calculateCorrectPercent = (correct: number, incorrect: number): number => {
  let result = 0;
  if (incorrect !== 0) {
    result = Math.round((correct / incorrect) * 100);
  }
  return result;
};

export const updateClickCounter = (word: string, categoryLink: string) => {
  const itemKey = word + categoryLink;
  const itemValue = localStorage.getItem(itemKey) as string;
  const itemData = JSON.parse(itemValue);
  itemData.clickCounter += 1;
  itemData.guessPercent = calculateCorrectPercent(itemData.correctCounter, itemData.errorCounter);
  localStorage.setItem(itemKey, JSON.stringify(itemData));
};

export const updateErrorCounter = (word: string, categoryLink: string) => {
  const itemKey = word + categoryLink;
  const itemValue = localStorage.getItem(itemKey) as string;
  const itemData = JSON.parse(itemValue);
  itemData.errorCounter += 1;
  itemData.guessPercent = calculateCorrectPercent(itemData.correctCounter, itemData.errorCounter);
  localStorage.setItem(itemKey, JSON.stringify(itemData));
};

export const updateCorrectCounter = (word: string, categoryLink: string) => {
  const itemKey = word + categoryLink;
  const itemValue = localStorage.getItem(itemKey) as string;
  const itemData = JSON.parse(itemValue);
  itemData.correctCounter += 1;
  itemData.guessPercent = calculateCorrectPercent(itemData.correctCounter, itemData.errorCounter);
  localStorage.setItem(itemKey, JSON.stringify(itemData));
};

export const createStatisticsBase = () => {
  const dictionary = createDictionary();
  // write dictionary to localStorage
  writeDictionaryToStorage(dictionary);
};

export const createTable = (): HTMLElement => { // dictionary: Array<Word>
  const tableWrapper = new BaseComponent('div', ['stats-table-wrapper']);
  const table = new BaseComponent('table', ['stats-table', 'table']);
  const tableHeader = new BaseComponent('thead', ['stats-table__header', 'thead-light']);
  tableHeader.element.innerHTML = `
    <tr>
      <th scope="col">Category</th>
      <th scope="col">Word</th>
      <th scope="col">Translation</th>
      <th scope="col">Clicks</th>
      <th scope="col">Guesses</th>
      <th scope="col">Mistakes</th>
      <th scope="col">%</th>
    </tr>
  `;
  const tableBody = new BaseComponent('tbody', ['stats-table__body']);
  // generate table rows
  for (let i = 0; i < localStorage.length; i++) {
    const tableRow = new BaseComponent('tr', ['stats-table__row']);
    const key = localStorage.key(i) as string;
    const itemData = localStorage.getItem(key) as string;
    const itemObj = JSON.parse(itemData);
    // console.log(itemObj.word);
    tableRow.element.innerHTML = `
      <td>${itemObj.category}</td>
      <td>${itemObj.word}</td>
      <td>${itemObj.translation}</td>
      <td>${itemObj.clickCounter}</td>
      <td>${itemObj.correctCounter}</td>
      <td>${itemObj.errorCounter}</td>
      <td>${itemObj.guessPercent}</td>
    `;
    tableBody.element.appendChild(tableRow.render());
    console.log(`${itemObj.guessCounter}`);
  }
  // assemble
  table.element.appendChild(tableHeader.render());
  table.element.appendChild(tableBody.render());
  tableWrapper.element.appendChild(table.render());
  return tableWrapper.render();
};
