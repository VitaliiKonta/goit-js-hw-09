// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const dateTimePicker = document.getElementById('datetime-picker');
const strBtn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minField = document.querySelector('[data-minutes]');
const secField = document.querySelector('[data-seconds]');

let countInterval = null;
let targetDate = null;

Notiflix.Report.info(
  ' Hi!',
  'Choose a date and click on button bellow ',
  'Press me))'
);

const upTime = () => {
  const currentDate = new Date();
  const remTime = targetDate - currentDate;

  if (remTime < 0) {
    clearInterval(countInterval);
    strBtn.disabled = true;
    dateTimePicker.disabled = false;
    Notiflix.Report.info('Warning!', 'Please choose a date', 'Press me))');
    return;
  }

  const days = Math.floor(remTime / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((remTime / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((remTime / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((remTime / 1000) % 60)
    .toString()
    .padStart(2, '0');

  daysField.textContent = days;
  hoursField.textContent = hours;
  minField.textContent = minutes;
  secField.textContent = seconds;
};

const strCount = () => {
  targetDate = new Date(dateTimePicker.value);
  countInterval = setInterval(upTime, 1000);
  strBtn.disabled = true;
  dateTimePicker.disabled = true;
};

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate < now) {
      Notiflix.Report.failure(
        'Something go wrong((',
        'Choose a date in the future',
        'Press me, please'
      );
      strBtn.disabled = true;
    } else {
      Notiflix.Report.success(
        'Let`s start',
        'Finally, selected date is in the future. Click `Start` on a counter to begin',
        'But now press me)'
      );
      strBtn.disabled = false;
    }
  },
});

strBtn.addEventListener('click', strCount);
