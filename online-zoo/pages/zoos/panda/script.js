function toggleSpoiler(spoilerElem, duration = 200) {
  let spoilerBody = spoilerElem.querySelector('.information__accordeon-content');
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
    element.childNodes.item(1).setAttribute('src', '../../../assets/icons/accordeon-arrow-down.svg');
  } else {
    element.childNodes.item(1).setAttribute('src', '../../../assets/icons/accordeon-arrow-up.svg');
  }
}

function setHeight(element) {
  if (element.attributes.class.value.includes('closed')) {
    element.classList.remove('information__accordeon-element_closed')
  } else {
    setTimeout(() => element.classList.add('information__accordeon-element_closed'), 400);
  }
}

document.querySelectorAll('.accordeon-arrow').forEach(element => {
  element.addEventListener('click', e => {
    setHeight(element.parentNode);
    toggleSpoiler(element.parentNode);
    changeSpoilerIco(element);
  });
});





