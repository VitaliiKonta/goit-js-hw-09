const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let bgcColorId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function startChangingColor() {
  startButton.disabled = true; // вимикаємо кнопку Start
  bgcColorId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangingColor() {
  startButton.disabled = false; // включаємо кнопку Start
  clearInterval(bgcColorId);
}

startButton.addEventListener('click', startChangingColor);
stopButton.addEventListener('click', stopChangingColor);
