const inputs = document.querySelectorAll('.filters input');
console.log(inputs)

function handleEvent() {
  const suffix = this.dataset.sizing || '';
  // console.log(this.name, this.value);
  document.documentElement.style.setProperty(`--${this.name}`, this.value+suffix);
}

inputs.forEach(input => input.addEventListener('change', handleEvent));
inputs.forEach(input => input.addEventListener('mousemove', handleEvent));