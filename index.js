'use strict'

import { addZero, toggleHide } from "./utils.js";

const startBtn = document.querySelector('#btn');
const resetBtn = document.querySelector('#btn-reset');

const title = document.querySelector('h1');

const inputBlock = document.querySelector('.input');
const outputBlock = document.querySelector('.output');

const timerHeader = document.querySelector('#title-date');
const userDate = document.querySelector('#date');
const numbers = document.querySelector('.numbers');

let intervalId = null;

class Timer {
  constructor() {
    this.targetDate = null;
  }

  getToday() {
    return new Date();
  }

  formatDeadline(date) {
    return new Date(date.split('-'));
  }

  getDiff() {
    return this.formatDeadline(this.targetDate) - this.getToday();
  }

  getDays() {
    return addZero(parseInt(this.getDiff() / (1000 * 60 * 60 * 24)));
  }
  getHours() {
    return addZero(parseInt((this.getDiff() / (1000 * 60 * 60)) % 24));
  }
  getMinutes() {
    return addZero(parseInt((this.getDiff() / (1000 * 60)) % 60));
  }
  getSeconds() {
    return addZero(parseInt((this.getDiff() / 1000) % 60));
  }

  isTimer = () => {
    if (!localStorage.getItem('timerHeader') || !localStorage.getItem('timerDate')) {
      return;
    }
    title.textContent = localStorage.getItem('timerHeader');
    this.targetDate = localStorage.getItem('timerDate');

    toggleHide([inputBlock, outputBlock, startBtn, resetBtn]);

    countdown();

    intervalId = setInterval(countdown, 1000);
    resetBtn.addEventListener('click', resetTimer, { once: true });
  }
}

const myTimer = new Timer();

function countdown() {
  if (myTimer.getDiff() <= 0) {
    clearInterval(intervalId);
    numbers.textContent = '0:0:0:0';
  }

  numbers.textContent = `${myTimer.getDays()}:${myTimer.getHours()}:${myTimer.getMinutes()}:${myTimer.getSeconds()}`;
}

const startTimer = () => {
  if (timerHeader.value === '') {
    alert('Введите заголовок');

    return;
  }

  if (userDate.value === '') {
    alert('Укажите дату окончания отсчета');

    return;
  }

  if (myTimer.formatDeadline(userDate.value) < myTimer.today) {
    alert('Укажите дату больше, чем сегодня');
    return;
  }

  toggleHide([inputBlock, outputBlock, startBtn, resetBtn]);

  resetBtn.addEventListener('click', resetTimer, { once: true });

  title.textContent = timerHeader.value;
  myTimer.targetDate = userDate.value;

  localStorage.setItem('timerHeader', timerHeader.value);
  localStorage.setItem('timerDate', userDate.value);

  countdown();

  intervalId = setInterval(countdown, 1000);
}

const resetTimer = () => {
  clearInterval(intervalId);
  localStorage.removeItem('timerHeader');
  localStorage.removeItem('timerDate');

  toggleHide([inputBlock, outputBlock, startBtn, resetBtn]);

  title.textContent = 'Создать новый таймер обратного отсчета';
  timerHeader.value = '';
  userDate.value = '';
}

myTimer.isTimer();
startBtn.addEventListener('click', startTimer);
