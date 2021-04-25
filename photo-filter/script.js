// Fullscreen implementation

const fullScreenButton = document.querySelector('.fullscreen');

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

fullScreenButton.addEventListener('click', toggleFullScreen);

// Filters implementation

const filtersDiv = document.querySelector('.filters');

function handleInput() {
  // console.log(`input was changed, input name is ${event.target.name} new value is ${event.target.value}${event.target.dataset.sizing}`);
  const suffix = event.target.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${event.target.name}`, `${event.target.value}${suffix}`);
  // output field:
  event.target.nextElementSibling.innerHTML = `${event.target.value}`;
}

filtersDiv.addEventListener('input', handleInput)

// create canvas
function createCanvas() {
  let canvas = document.getElementById('image-canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    // Создаем объект изображения
    let img = new Image();

    // Привязываем функцию к событию onload
    // Это указывает браузеру, что делать, когда изображение загружено
    img.onload = function() {
      ctx.drawImage(img, 0, 0, 830, 520);
    };

    // Загружаем файл изображения
    img.src = "./assets/img/img.jpg";
  }
}

// Next picture button:

const nextPictureBtn = document.querySelector('.btn-next');

  // Здесь будем хранить переменные
let pictureFolderLink =  `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/`;
let timeOfDay = undefined;
let pictureCounter = 1;


  // определить какое время суток
function getTimeOfDay() {
  let currentDate = new Date();
  let currentTime = +(currentDate.getHours());
  let timeOfDay = '';

  if (currentTime >= 6 && currentTime < 12) {
    timeOfDay = 'morning';
  } else if (currentTime >= 12 && currentTime < 18) {
    timeOfDay = 'day';
  } else if (currentTime >= 18 && currentTime < 24) {
    timeOfDay = 'evening';
  } else if (currentTime >= 0 && currentTime < 6) {
    timeOfDay = 'night';
  }
  return timeOfDay;
}

  // console.log(`current time is ${currentTime}`);
  // console.log(`time of day is ${timeOfDay}`);

  // создать ссылку на изображение
function generatePictureLink() {
  // учитываем время суток
  if (timeOfDay === undefined) {
    timeOfDay = getTimeOfDay();
  } else {
    if (timeOfDay !== getTimeOfDay()) {
      timeOfDay = getTimeOfDay();
      pictureCounter = 1;
    }
  }
  // учитываем номер картинки
  let pictureCounterText = '';
  if (pictureCounter < 10) {
    pictureCounterText = `0${pictureCounter}`;
  } else if (pictureCounter > 20) {
    pictureCounter = 1;
    pictureCounterText = '01';
  } else {
    pictureCounterText = String(pictureCounter);
  }
  // генерим ссылку
  const link = pictureFolderLink + '/' + timeOfDay + '/' + pictureCounterText + '.jpg';
  pictureCounter += 1;
  return link;
}

  // отрисуем канвас с новой картинкой
function handleNextPicture() {
  let canvas = document.getElementById('image-canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    // Создаем объект изображения
    let img = new Image();

    // Привязываем функцию к событию onload
    // Это указывает браузеру, что делать, когда изображение загружено
    img.onload = function() {
      ctx.drawImage(img, 0, 0, 830, 520);
    };

    // Загружаем файл изображения
    img.src = generatePictureLink();
  }
}

nextPictureBtn.addEventListener('click', handleNextPicture);

// Reset button
