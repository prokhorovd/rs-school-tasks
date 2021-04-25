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
  let suffix = event.target.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${event.target.name}`, `${event.target.value}${suffix}`);
  event.target.nextElementSibling.innerHTML = `${event.target.value}`;
}

filtersDiv.addEventListener('input', handleInput)

// ######################################################################################
