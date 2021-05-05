const mapContent = document.querySelector('.map__content');
const wrapper = document.getElementById('map__wrapper');
const headerElem = document.querySelector('.header');
const footerElem = document.querySelector('.footer');
const zoomInButton = document.getElementById('map-btn-plus');
const zoomOutButton = document.getElementById('map-btn-minus');
const mapImage = document.querySelector('.map__image');


let topIndent = 0;
let leftIndent = 0;

const calculateCoords = (e, elem) => {
  let box = elem.getBoundingClientRect();
  topIndent = e.pageY - box.top;// + pageYOffset;
  leftIndent = e.pageX - box.left + pageXOffset;
}

const moveAt = (e) => {
  if (mapContent.style.position !== "absolute") {mapContent.style.position = "absolute";}
  mapContent.style.left = e.pageX - leftIndent + 'px';
  if (e.pageX >= wrapper.offsetWidth) {
    stopDrag();
  } else if (e.pageX <= 0) {
    stopDrag();
  }
  mapContent.style.top = e.pageY - (80 - pageYOffset) - topIndent + 'px';
}

const stopDrag = () => {
  document.removeEventListener('mousemove', moveAt);
  mapContent.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('mouseup', stopDrag);

}

mapContent.addEventListener('mousedown', (e) => {

  if (mapContent.offsetWidth <= wrapper.offsetWidth && mapContent.offsetHeight <= wrapper.offsetHeight) {
    return;
  }
  calculateCoords(e, mapContent);
  moveAt(e);

  document.addEventListener('mousemove', moveAt);
  mapContent.addEventListener('mouseup', stopDrag);
  document.addEventListener('mouseup', stopDrag);
});



mapContent.ondragstart = function() {
  return false;
};

headerElem.addEventListener('mouseenter', stopDrag);
footerElem.addEventListener('mouseenter', stopDrag);

zoomInButton.addEventListener('click', () => {
  if (mapContent.offsetWidth <= wrapper.offsetWidth * 2) {
    if (mapContent.style.position !== "absolute") {mapContent.style.position = "absolute";}
    const oldWidth = mapContent.offsetWidth;
    const oldHeight = mapContent.offsetHeight;
    mapContent.style.width = `${mapContent.offsetWidth * 1.25}px`;
    mapContent.style.height = "auto";
    const newWidth = mapContent.offsetWidth;
    const newHeight = mapContent.offsetHeight;
    const topPos = mapContent.offsetTop || 0;
    const leftPos = mapContent.offsetLeft || 0;

    mapContent.style.left = `${leftPos - ((newWidth - oldWidth) / 2)}px`;
    mapContent.style.top = `${topPos - ((newHeight - oldHeight) / 2)}px`;
  }
});

zoomOutButton.addEventListener('click', () => {
  if (mapContent.offsetWidth > wrapper.offsetWidth || mapContent.offsetHeight > wrapper.offsetHeight) {
    if (mapContent.style.position !== "absolute") {mapContent.style.position = "absolute";}
    const oldWidth = mapContent.offsetWidth;
    const oldHeight = mapContent.offsetHeight;
    mapContent.style.width = `${mapContent.offsetWidth / 1.25}px`;
    mapContent.style.height = "auto";
    const newWidth = mapContent.offsetWidth;
    const newHeight = mapContent.offsetHeight;
    const topPos = mapContent.offsetTop || 0;
    const leftPos = mapContent.offsetLeft || 0;

    mapContent.style.left = `${leftPos + ((oldWidth - newWidth) / 2)}px`;
    mapContent.style.top = `${topPos + ((oldHeight - newHeight) / 2)}px`;

    if (mapContent.offsetWidth <= wrapper.offsetWidth && mapContent.offsetHeight <= wrapper.offsetHeight) {
      mapContent.style.width = `${wrapper.offsetWidth}px`;
      mapContent.style.height = "auto";
      mapContent.style.top = `${(wrapper.offsetHeight - mapContent.offsetHeight) / 2}px`;
      mapContent.style.left = '0px';
      if (mapContent.offsetHeight >= wrapper.offsetHeight) {
        mapContent.style.height = `${wrapper.offsetHeight}px`;
        mapContent.style.width = 'auto';
        mapContent.style.top = `${(wrapper.offsetHeight - mapImage.height) / 2}px`;
        mapContent.style.left = `${(wrapper.offsetWidth - mapContent.offsetWidth) / 2}px`;
      }
    }
  }
});

// POPUP WINDOWS

const popupWrapper = document.querySelector(".popup-wrapper");
const donateButton = document.querySelector(".footer__button");
const donatePopupWindow = document.querySelector(".donate-popup");
const donateAmountField = document.querySelector(".donate-popup__money-amount");
const donatePopupCloseBtn = document.querySelector(".donate-popup__close");
const donatePopupNextBtn = document.querySelector(".donate-popup__form");
const payPopupWindow = document.querySelector(".pay-popup");
const payPopupCloseBtn = document.querySelector(".pay-popup__close");


function showDonateWindow() {
  document.body.classList.add('notScrollable');
  popupWrapper.classList.remove('popup-hidden');
  donatePopupWindow.classList.remove("popup-hidden");
}

function closeDonatePopup() {
  document.querySelector(".donate-popup__form").reset();
  document.body.classList.remove('notScrollable');
  popupWrapper.classList.add('popup-hidden');
  donatePopupWindow.classList.add("popup-hidden");
}

function showPayWindow() {
  if (donateAmountField.validity.valid) {
    closeDonatePopup()
    document.body.classList.add('notScrollable');
    popupWrapper.classList.remove('popup-hidden');
    payPopupWindow.classList.remove("popup-hidden");
  }
}

function closePayPopup() {
  document.querySelector(".pay-popup__form").reset();
  document.body.classList.remove('notScrollable');
  popupWrapper.classList.add('popup-hidden');
  payPopupWindow.classList.add("popup-hidden");
}

function closePopups() {
  document.querySelector(".donate-popup__form").reset();
  document.querySelector(".pay-popup__form").reset();
  document.body.classList.remove('notScrollable');
  popupWrapper.classList.add('popup-hidden');
  donatePopupWindow.classList.add("popup-hidden");
  payPopupWindow.classList.add("popup-hidden");

}

donateButton.addEventListener('click', showDonateWindow);
donatePopupCloseBtn.addEventListener('click', closeDonatePopup);
donatePopupNextBtn.addEventListener('submit', function (event) {
  event.preventDefault();
  showPayWindow();
});
payPopupCloseBtn.addEventListener('click', closePayPopup);

popupWrapper.addEventListener('click', (event) => {
  if (event.target === popupWrapper) {
    closePopups();
  }
})
