const feedbackButton = document.querySelector(".testimonials__button");
const popupWrapper = document.querySelector(".popup-wrapper");
const feedbackPopupWindow = document.querySelector(".feedback-popup");
const feedbackPopupCloseBtn = document.querySelector(".feedback-popup__close");
const donateButton = document.querySelector(".footer__button");
const donatePopupWindow = document.querySelector(".donate-popup");
const donateAmountField = document.querySelector(".donate-popup__money-amount");
const donatePopupCloseBtn = document.querySelector(".donate-popup__close");
// const donatePopupNextBtn = document.querySelector(".donate-popup__btn-next");
const donatePopupNextBtn = document.querySelector(".donate-popup__form");
const payPopupWindow = document.querySelector(".pay-popup");
const payPopupCloseBtn = document.querySelector(".pay-popup__close");

//FUNCTIONS
function showFeedbackPopup() {
  // проверить размеры блока feedback
  document.body.classList.add('notScrollable');
  popupWrapper.classList.remove('popup-hidden');
  feedbackPopupWindow.classList.remove("popup-hidden");
  // popupWrapper.addEventListener('click',closeFeedbackPopup)
}

function closeFeedbackPopup() {
  // TODO сделать закрытие по щелчку по затемненной области
  document.querySelector(".feedback-popup__form").reset();
  document.body.classList.remove('notScrollable');
  popupWrapper.classList.add('popup-hidden');
  feedbackPopupWindow.classList.add("popup-hidden");
  // popupWrapper.removeEventListener('click', closeFeedbackPopup);
}

function showDonateWindow() {
  document.body.classList.add('notScrollable');
  popupWrapper.classList.remove('popup-hidden');
  donatePopupWindow.classList.remove("popup-hidden");
}

function closeDonatePopup() {
  // TODO сделать закрытие по щелчку по затемненной области
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
  // TODO сделать закрытие по щелчку по затемненной области
  document.querySelector(".pay-popup__form").reset();
  document.body.classList.remove('notScrollable');
  popupWrapper.classList.add('popup-hidden');
  payPopupWindow.classList.add("popup-hidden");
}

function closePopups() {
  document.querySelector(".feedback-popup__form").reset();
  document.querySelector(".donate-popup__form").reset();
  document.querySelector(".pay-popup__form").reset();
  document.body.classList.remove('notScrollable');
  popupWrapper.classList.add('popup-hidden');
  feedbackPopupWindow.classList.add("popup-hidden");
  donatePopupWindow.classList.add("popup-hidden");
  payPopupWindow.classList.add("popup-hidden");

}


// LISTENERS
feedbackButton.addEventListener('click', showFeedbackPopup);
feedbackPopupCloseBtn.addEventListener('click', closeFeedbackPopup);
donateButton.addEventListener('click', showDonateWindow);
donatePopupCloseBtn.addEventListener('click', closeDonatePopup);
donatePopupNextBtn.addEventListener('submit', function (event) {
  // console.log('hooked');
  event.preventDefault();
  showPayWindow();
});
payPopupCloseBtn.addEventListener('click', closePayPopup);

popupWrapper.addEventListener('click', (event) => {
  // console.log(event.target)
  if (event.target === popupWrapper) {
    console.log('clicked')
    closePopups();
  }
})

//debugger listener
// document.addEventListener('click',(event) => {
//   console.log(event.target);
// })
