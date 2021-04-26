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
const canvas = document.getElementById('image-canvas');

// create canvas
function createCanvas() {

  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    // Создаем объект изображения
    let img = new Image();

    // Привязываем функцию к событию onload
    // Это указывает браузеру, что делать, когда изображение загружено
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
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
  // let canvas = document.getElementById('image-canvas');
  // if (canvas.getContext) {
  //   let ctx = canvas.getContext('2d');
  //   // Создаем объект изображения
  //   let img = new Image();
  //
  //   // Привязываем функцию к событию onload
  //   // Это указывает браузеру, что делать, когда изображение загружено
  //   img.onload = function() {
  //     ctx.drawImage(img, 0, 0, 830, 520);
  //   };
  //
  //   // Загружаем файл изображения
  //   img.src = generatePictureLink();
  // }
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = generatePictureLink();
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  };
}

nextPictureBtn.addEventListener('click', handleNextPicture);

// Reset button

const resetButton = document.querySelector('.btn-reset');

function handleReset() {
  const allFilters = document.querySelectorAll('.filters input');
  allFilters.forEach(element => {
    if (element.name === 'saturate') {
      element.value = '100%';
      element.nextElementSibling.innerHTML = `100`
      document.documentElement.style.setProperty(`--${element.name}`, `100%`);
    } else {
      element.value = 0;
      element.nextElementSibling.innerHTML = `0`;
      document.documentElement.style.setProperty(`--${element.name}`, `0`);
    }

  });
}

resetButton.addEventListener('click', handleReset);

// Upload button

const fileInput = document.querySelector('input[type="file"]');

function createUploadCanvas(imgSrc) {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = imgSrc;
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  };
}

fileInput.addEventListener('click', () => {
  fileInput.value = '';
});

fileInput.addEventListener('change', function(e) {
  // console.log('fileinput initiated')
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    createUploadCanvas(img.src);
  }
  reader.readAsDataURL(file);
});

// Download button

const downloadButton = document.querySelector('.btn-save');

function testFunc() {
  // создать копию последнего изображения на скрытом канвасе
  const hiddenCanvas = document.getElementById('canvas-hidden');
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  // console.log(canvas.toDataURL("image/png"));
  img.src = canvas.toDataURL("image/png");
  img.onload = function() {
    hiddenCanvas.width = img.width;
    hiddenCanvas.height = img.height;
    const ctx = hiddenCanvas.getContext("2d");
    // попытка 2 достать значения фильтров и применить.
    // получим значение фильтров
    let allFilters = document.querySelectorAll("output");
    let filterValuesArray = [];
    allFilters.forEach(element => {
      filterValuesArray.push(element.value);
    })
    console.log(`filter values Array = ${filterValuesArray}`);
    // откорректируем значение blur
    // 1) посчитаем коэффициент blur
    let canvasWindow = document.getElementById('image-canvas');
    let blurCoefficient;
    // проверяем что больше - ширина или высота картинки, берем большее
    if (canvasWindow.width >= canvasWindow.height) {
      // проверяем больше ли изображение чем окно в которое вписано изображение
      if (canvasWindow.width >= canvasWindow.offsetWidth) {
        blurCoefficient = canvasWindow.width / canvasWindow.offsetWidth;
      } else blurCoefficient = canvasWindow.width / canvasWindow.offsetWidth;
    } else {
      if (canvasWindow.height >= canvasWindow.offsetHeight) {
        blurCoefficient = canvasWindow.height / canvasWindow.offsetHeight;
      } else blurCoefficient = canvasWindow.height / canvasWindow.offsetHeight;
    }
    blurCoefficient = blurCoefficient.toFixed(2);
    console.log(`blur coefficient for this image is ${blurCoefficient}`)
    // 2) добавим откорректированое значение к остальным значениям фильтров
    let calculatedBlur = (filterValuesArray[0] * blurCoefficient).toFixed(2);
    filterValuesArray[0] = calculatedBlur;

    // составим список фильтров со значениями для canvas:
    let filtersList = `blur(${filterValuesArray[0]}px) invert(${filterValuesArray[1]}%) sepia(${filterValuesArray[2]}%) saturate(${filterValuesArray[3]}%) hue-rotate(${filterValuesArray[4]}deg)`;
    console.log(`filter list to apply: ${filtersList}`)

    // применим фильтры
    ctx.filter = filtersList;

    // достаем значения фильтров из документа
    // let filterString = document.documentElement.style.cssText;
    // let modifiedFilterString = '';
    // let filterArray = filterString.split('');
    // for (let i = 0; i < filterArray.length; i++) {
    //   if (filterArray[i] != '-') {
    //     if (filterArray[i] === ':') {
    //       modifiedFilterString += '(';
    //     } else if (filterArray[i] === ';') {
    //       modifiedFilterString += ')';
    //     } else modifiedFilterString += filterArray[i];
    //   }
    // }
    // console.log(modifiedFilterString);
    // // filterArray = modifiedFilterString.split(' ');
    // // console.log(filterArray);
    //
    // //применяем полученные фильтры
    // console.log(`Applied filters: ${modifiedFilterString}`);
    // ctx.filter = modifiedFilterString;

    // если есть blur - модифицировать его коэффициентом и снова добавить к фильтрам
    // let canvasWindow = document.getElementById('image-canvas');
    // let blurCoefficient;
    // if (canvasWindow.width > canvasWindow.offsetHeight) {
    //   if (canvasWindow.width >= canvasWindow.height) {
    //     blurCoefficient = canvasWindow.width / canvasWindow.offsetWidth;
    //   } else blurCoefficient = canvasWindow.height / canvasWindow.offsetHeight;
    // } else {
    //   if (canvasWindow.width <= canvasWindow.height) {
    //     blurCoefficient = canvasWindow.width / canvasWindow.offsetWidth;
    //   } else blurCoefficient = canvasWindow.height / canvasWindow.offsetHeight;
    // }
    // blurCoefficient = blurCoefficient.toFixed(2);
    // console.log(`blur coefficient for this image is ${blurCoefficient}`)
    // // del ctx.filter = `blur(1px) blur(1px) sepia(1%) blur(${10*blurCoefficient}px)`;

    // значение blur берется из первого output на странице
    // let calculatedBlur = (document.querySelector('output').value * blurCoefficient).toFixed(1);
    // console.log(`corrected blur is ${calculatedBlur}`)
    // modifiedFilterString += ` blur(${calculatedBlur}px)`;
    // ctx.filter = modifiedFilterString;
    // console.log(`Corrected filters: ${modifiedFilterString}`);

    //
    // modifiedFilterString += ' blur(0.75px)'


    // console.log(modifiedFilterString);
    //filter: invert(75%); sepia(60%);saturate(30%);hue-rotate(90deg);

    // рисуем получившееся художество на скрытом холсте
    ctx.drawImage(img, 0, 0);
    // получаем ссылку и скачиваем содержимое скрытого холста
    let link = document.createElement('a');
    link.download = 'download.png';
    link.href = hiddenCanvas.toDataURL("image/png");
    link.click();
    link.delete;
  };
}

downloadButton.addEventListener('click', testFunc);
