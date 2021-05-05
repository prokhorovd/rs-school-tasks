// POPUPS
const feedbackButton = document.querySelector(".testimonials__button");
const popupWrapper = document.querySelector(".popup-wrapper");
const feedbackPopupWindow = document.querySelector(".feedback-popup");
const feedbackPopupCloseBtn = document.querySelector(".feedback-popup__close");
const donateButton = document.querySelector(".footer__button");
const donatePopupWindow = document.querySelector(".donate-popup");
const donateAmountField = document.querySelector(".donate-popup__money-amount");
const donatePopupCloseBtn = document.querySelector(".donate-popup__close");
const donatePopupNextBtn = document.querySelector(".donate-popup__form");
const payPopupWindow = document.querySelector(".pay-popup");
const payPopupCloseBtn = document.querySelector(".pay-popup__close");

function showFeedbackPopup() {
  document.body.classList.add('notScrollable');
  popupWrapper.classList.remove('popup-hidden');
  feedbackPopupWindow.classList.remove("popup-hidden");
}

function closeFeedbackPopup() {
  document.querySelector(".feedback-popup__form").reset();
  document.body.classList.remove('notScrollable');
  popupWrapper.classList.add('popup-hidden');
  feedbackPopupWindow.classList.add("popup-hidden");
}

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
  document.querySelector(".feedback-popup__form").reset();
  document.querySelector(".donate-popup__form").reset();
  document.querySelector(".pay-popup__form").reset();
  document.body.classList.remove('notScrollable');
  popupWrapper.classList.add('popup-hidden');
  feedbackPopupWindow.classList.add("popup-hidden");
  donatePopupWindow.classList.add("popup-hidden");
  payPopupWindow.classList.add("popup-hidden");

}

feedbackButton.addEventListener('click', showFeedbackPopup);
feedbackPopupCloseBtn.addEventListener('click', closeFeedbackPopup);
donateButton.addEventListener('click', showDonateWindow);
donatePopupCloseBtn.addEventListener('click', closeDonatePopup);
donatePopupNextBtn.addEventListener('submit', function (event) {
  event.preventDefault();
  showPayWindow();
});
payPopupCloseBtn.addEventListener('click', closePayPopup);

popupWrapper.addEventListener('click', (event) => {
  if (event.target === popupWrapper) {
    // console.log('clicked')
    closePopups();
  }
})

// HOW IT WORKS CAROUSEL
const howitworksSlider = document.querySelector(".howitworks__slider");
const howitworksElements = document.querySelectorAll(".howitworks__slider-element");
const howitworksSliderElems = Array.from(howitworksElements);

howitworksSlider.addEventListener('click', function (event) {
  let newActive = event.target;
  let isItem = newActive.closest('.howitworks__slider-element');

  if (!isItem || newActive.classList.contains('howitworks__slider-element_active')) {
    return;
  };

  update(newActive);
});

const update = function(newActive) {
  const newActivePos = newActive.dataset.position;
  // console.log(`newActivePos = ${newActivePos}`)

  const current = howitworksSliderElems.find((elem) => elem.dataset.position == 0);
  const prev = howitworksSliderElems.find((elem) => elem.dataset.position == -1);
  const next = howitworksSliderElems.find((elem) => elem.dataset.position == 1);
  const first = howitworksSliderElems.find((elem) => elem.dataset.position == -2);
  const last = howitworksSliderElems.find((elem) => elem.dataset.position == 2);

  current.classList.remove('howitworks__slider-element_active');

  [current, prev, next, first, last].forEach(item => {
    let itemPos = item.dataset.position;
    // console.log(`itemPos = ${itemPos}`);

    item.dataset.position = getPos(itemPos, newActivePos)
  });
};

const getPos = function (current, active) {
  const diff = current - active;
  // console.log(`diff = current - active (${diff} = ${current} - ${active})`)

  if (Math.abs(current - active) > 2) {
    if (diff < 0) {
      return (diff + 5)
    }
    return (diff - 5)
  }
  return diff;
}

// PETS IN ZOO SLIDER
let slider = document.getElementById('slider'),
  sliderItems = document.getElementById('slides'),
  prev = document.querySelector('.pets__slider-prev'),
  next = document.querySelector('.pets__slider-next');

function slide(wrapper, items, prev, next) {
  let posInitial,
    slides = items.getElementsByClassName('slide'),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true;

  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('loaded');

  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });

  // Transition events
  items.addEventListener('transitionend', checkIndex);

  function shiftSlide(dir, action) {
    items.classList.add('shifting');

    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }

      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;
      }
    };

    allowShift = false;
  }

  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    allowShift = true;
  }
}

slide(slider, sliderItems, prev, next);
