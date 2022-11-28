# English for kids
### English for kids - an application for learning English words for kids. (July 2021)
Deploy: https://prokhorovd-english-for-kids.netlify.app/

### Tools and technologies: 
SPA, Typescript, adaptive layout, webpack, eslint + eslint-config-airbnb-base. Project was implemented module by module, localStorage was used as data storage, app was developed for and tested for Google Chrome.

### App features
- Main page
  - there are links to the pages with categories of words;
  - on the main page and category pages of the application, there is a Train / Play switch button;
- Category Page
  - category page includes category name and word cards related to category theme
  - each card has a thematic picture and an English word
  - each card has a button on the right bottom corner. When you click on the button, the card flips over. The back side of the card has a translation of the word. Clicking on the back side of the card does not trigger any events like the pronunciation of the word. A card is rotated back to the front side when the mouse cursor moves beyond the borders of the card;
- Statistics Page
  - statistics page contains a list of all categories, all words in each category, and a translation of each word;
  - statistics are displayed next to each word - how many times a card with a given word was clicked in training mode, how many times this word was guessed in game mode, how many mistakes were made, the percentage of correct answers for each word in game mode. After restarting the application, statistics are saved;
  - it is possible to sort the data alphabetically, for numerical data - by their value;
  - the "Reset" button resets statistics.

### Game modes description
- Training mode (default):
  - when you click on the card, the word is pronounced in English;
  - each card has a button on the right bottom corner. When you click on that button the card flips over. The back side of the card has a translation of the word. A card is rotated back to the front side when the mouse cursor moves beyond the borders of the card;
- Game mode:
  - mode is activated by toggling the Train/Play switch button. Features of Training mode are disabled for the game mode, the "Start game" button is displayed;
  - after clicking on the "Start game" button, the random word from those on the page is pronounced. For each page, and for each game, random words are generated anew;
  - after the first click on the "Start game" button, the button changes to the "Repeat" icon. When you click on the "Repeat" button, the word is pronounced again;
  - when the game is over the “success” screen will be shown, if all words are guessed correctly. Else, if there were errors while guessing the words, the “failure” screen will be shown with the number of mistakes. Afterward, the application automatically redirects to the main page with a list of categories;

  ### How to use:
- clone this repo;
- `npm i` to install dependencies;
- available scripts:
  - `npm run build` will build project in ./dist folder;
  - `npm run dev` will run dev-server;
  - `npm run lint` to check project for linter errors;

___

### Приложение для изучения английских слов детьми (Июль 2021)
Deploy: https://prokhorovd-english-for-kids.netlify.app/

### Инструменты и технологии
SPA, Typescript, адаптивная верстка, webpack, eslint + eslint-config-airbnb-base.
Разработка осуществлялась модулями, для хранения данных используется localStorage, проверка работы приложения осуществлялась в google chrome.

### Функционал приложения
- Главная страница
  - Карточки-ссылки на страницы с категориями слов, ссылки дублируются в выезжающем боковом меню.
  - На главной странице приложения и на страницах категорий есть переключатель Train/Play (тренировка/игра)
- Страница категории
  - Содержит название категории и карточки карточки со словами соответствующей тематики.
  - Каждая карточка содержит тематическую картинку и слово на английском языке, при клике по карточке звучит произношение слова на английском языке.
  - На каждой карточке есть кнопка, при клике по которой карточка переворачивается. На оборотной стороне карточки размещается перевод слова. При клике по оборотной стороне карточки ничего не происходит, произношение слова не звучит. Обратный поворот карточки на лицевую сторону происходит автоматически, когда курсор мыши перемещается за её границы
- Страница статистики
  - Страница со статистикой содержит перечень всех категорий, всех слов в каждой категории, перевод каждого слова. Возле каждого слова указывается статистика - сколько раз по карточки с данным словом кликали в режиме тренировки, сколько раз данное слово угадывали в режиме игры, сколько ошибок при этом допустили, процент правильных ответов по каждому слову в режиме игры. После перезагрузки приложения статистика сохраняется.
  - Есть возможность сортировки. Reset - обнулить статистику.

### Описание режимов игры:
- Режим тренировки:
  - При клике по карточке звучит произношение слова на английском языке. На каждой карточке есть кнопка, при клике по которой карточка поворачивается, на обратной стороне указан перевод слова. Когда курсор мыши перемещается за границы карточки, она автоматически поворачивается на лицевую сторону.
- Режим игры:
  - Кликом по переключателю Train/Play включается режим игры (отключаются возможности тренировки, появляется кнопка start game). 
  - После клика по кнопке "Start game" звучит английское произношение рандомного слова из тех, что находятся на странице. После первого клика по кнопке "Start game" надпись на ней меняется на иконку "Repeat", меняется внешний вид кнопки. При клике по кнопке "Repeat" произношение слова звучит ещё раз.
  - Задача пользователя - правильно выбирать слова, которые звучат. По итогу игры выводится: "успех", если все было угадано, и "провал", если были ошибки.

### Как использовать:
- Клонировать этот репозиторий
- `npm i`,
- доступные команды:
  - `npm run build` билд проекта в папку ./dist,
  - `npm run dev` dev-сервер,
  - `npm run lint` проверка линтером
