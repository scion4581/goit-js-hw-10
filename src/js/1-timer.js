"use strict";

import flatpickr from "flatpickr";
import iziToast from "izitoast";
import errorIcon from '../img/err-icon.png';

const startTimerButton = document.querySelector(".timer-section button");
const timerDateInput = document.getElementById("datetime-picker");

const timerDaysLabel = document.querySelector("[data-days]");
const timerHoursLabel = document.querySelector("[data-hours]");
const timerMinutesLabel = document.querySelector("[data-minutes]");
const timerSecondsLabel = document.querySelector("[data-seconds]");

let userSelectedDate;
let timerIntervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      onSelectDate(selectedDates[0]);
  },
};

function onSelectDate(date) {
    const selectedTime = date.getTime();
    const currentTime = new Date().getTime();
    if (selectedTime <= currentTime) {
        showErrorMessage("Please choose a date in the future");
        startTimerButton.disabled = true;
    } else {
        startTimerButton.disabled = false;
        userSelectedDate = date;  
    }
}

function showErrorMessage(msgText) {
    iziToast.error({
        title: 'Error',
        message: msgText,
        iconUrl: errorIcon,
        position: 'topRight',
        titleColor: '#FFF',
        messageColor: '#FFF',
        backgroundColor: '#EF4040',
        theme: 'dark',
        progressBar: false,
    });
}

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
    
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerLabels({ days, hours, minutes, seconds }) {
    timerDaysLabel.textContent = addLeadingZero(days);
    timerHoursLabel.textContent = addLeadingZero(hours);
    timerMinutesLabel.textContent = addLeadingZero(minutes)
    timerSecondsLabel.textContent = addLeadingZero(seconds);
}

function onTmerTick() {
    const timeNow = new Date().getTime();
    const userSelectedTime = userSelectedDate.getTime();
    
    // has the selected date arrived? 
    if (timeNow >= userSelectedTime) {
        updateTimerLabels({days: 0, hours: 0, minutes: 0, seconds: 0});
        clearInterval(timerIntervalId);
        timerDateInput.disabled = false;
        return;
    }
    //calculate diff
    updateTimerLabels(convertMs(userSelectedTime - timeNow));
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

startTimerButton.addEventListener('click', function () {
    timerIntervalId = setInterval(onTmerTick, 1000);
    timerDateInput.disabled = true;
    startTimerButton.disabled = true;
})

flatpickr("#datetime-picker", options);
