function toggleSpoiler(spoilerElem, duration = 200) {
  let spoilerBody = spoilerElem.querySelector('.information__accordion-content');
  let isCollapsing = spoilerElem.classList.contains('expanded');
  spoilerElem.classList.toggle('expanded', !isCollapsing);
  slideReveal(spoilerBody, !isCollapsing, { duration: duration });
}

function slideReveal(element, isOpening, options) {
  let h0 = getHeight(element);
  let duration = (options && options.duration) || 1000;
  let start = null;
  function step(timestamp) {
    if (!start) { start = timestamp; }
    let progress = 1.0 * (timestamp - start) / duration;
    let h1 = isOpening ? (h0 * progress) : (h0 * (1 - progress));
    if (progress < 1.0) {
      element.style.height = h1 + 'px';
      window.requestAnimationFrame(step);
    } else {
      element.style.height = '';
      element.style.overflow = '';
      if (!isOpening) { element.style.display = 'none'; }
    }
  }
  element.style.display = 'block';
  element.style.overflow = 'hidden';
  window.requestAnimationFrame(step);
}

// https://stackoverflow.com/a/29047232/3423843
// This func determines height of hidden div on page
function getHeight(el) {
  let el_comp_style = window.getComputedStyle(el),
    el_display    = el_comp_style.display,
    el_max_height = el_comp_style.maxHeight.replace('px', '').replace('%', ''),
    el_position   = el.style.position,
    el_visibility = el.style.visibility,
    wanted_height = 0;

  if (el_display !== 'none' && el_max_height !== '0') {
    return el.offsetHeight;
  }

  el.style.position   = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display    = 'block';

  wanted_height = el.offsetHeight;

  el.style.display    = el_display;
  el.style.position   = el_position;
  el.style.visibility = el_visibility;

  return wanted_height;
}

function changeSpoilerIco(element) {
  if (element.childNodes.item(1).attributes.src.value.includes('up')) {
    element.childNodes.item(1).setAttribute('src', '../../../assets/icons/accordion-arrow-down.svg');
  } else {
    element.childNodes.item(1).setAttribute('src', '../../../assets/icons/accordion-arrow-up.svg');
  }
}

function setHeight(element) {
  if (element.attributes.class.value.includes('closed')) {
    element.classList.remove('information__accordion-element_closed')
  } else {
    setTimeout(() => element.classList.add('information__accordion-element_closed'), 400);
  }
}

// document.querySelectorAll('.accordion-arrow').forEach(element => {
//   element.addEventListener('click', e => {
//     setHeight(element.parentNode);
//     toggleSpoiler(element.parentNode);
//     changeSpoilerIco(element);
//   });
// });

document.querySelectorAll('.information__accordion-element').forEach(element => {
  element.addEventListener('click', e => {
    setHeight(element);
    toggleSpoiler(element);
    changeSpoilerIco(element.childNodes.item(3));
  });
});

// auto carousel
const gap = 16;

const carousel = document.getElementById('animals__carousel'),
  content = document.getElementById('animals__video-grid');

let slideIndex = 0;

let width = carousel.offsetWidth;
let slideWidth = document.querySelector('.animals__video-iframe').offsetWidth;
window.addEventListener('resize', (e) => {
  width = carousel.offsetWidth;
  slideWidth = document.querySelector('.animals__video-iframe').offsetWidth;
});

const slideFunc = () => {
  slideIndex += 1;
  if (slideIndex > 3) {
    slideIndex = 0;
  }
  carousel.scrollTo((slideWidth + gap) * slideIndex, 0);
}

let autoSlideInterval = setInterval(slideFunc, 3000);
let autoSlideTimeout = null;

const delayAutoSliding = () => {
  clearTimeout(autoSlideTimeout);
  clearInterval(autoSlideInterval);
  autoSlideInterval = null;

  autoSlideTimeout = setTimeout(() => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(slideFunc, 3000);
  }, 2000);
}


carousel.addEventListener('click', () => {
  delayAutoSliding();
});

// VIDEO CHANGER
const smallVideoBoxes = document.querySelectorAll('.animals__iframe-wrapper');
const largeVideoBox = document.querySelector('.animal__video-large');

function replaceVideo(element) {
  const currentlyActiveVideo = largeVideoBox.firstElementChild.attributes.src.value;
  largeVideoBox.firstElementChild.attributes.src.value = element.firstElementChild.attributes.src.value;
  element.firstElementChild.attributes.src.value = currentlyActiveVideo;
}

smallVideoBoxes.forEach(element => {
  element.addEventListener('click', () => replaceVideo(element));
});

// SIDEBAR BUTTON

const showSidebarButton = document.querySelector('.animal__sidebar-switcher');
const sidebar = document.querySelector('.animal__sidebar');

function showSidebar() {
  sidebar.classList.add('animal__sidebar_visible');
  showSidebarButton.classList.add('animal__sidebar-switcher_hidden');
}

showSidebarButton.addEventListener('click', showSidebar);

// POPUP WINDOWS

const popupWrapper = document.querySelector(".popup-wrapper");
const feedButton = document.querySelector('.animal__sidebar-feed');
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
feedButton.addEventListener('click', showDonateWindow);
donatePopupCloseBtn.addEventListener('click', closeDonatePopup);
donatePopupNextBtn.addEventListener('submit', function (event) {
  event.preventDefault();
  showPayWindow();
});
payPopupCloseBtn.addEventListener('click', closePayPopup);

popupWrapper.addEventListener('click', (event) => {
  if (event.target === popupWrapper) {
    console.log('clicked')
    closePopups();
  }
})
