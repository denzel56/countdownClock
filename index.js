'use strict'
/*
  - Получаем input`ы и сохраняем в переменные.
  - На кнопку добавляем слушатель события клик.
  - По клику на кнопку записываем в переменные (name, endDate) значения полученные от пользователя.
    Меняем заголовок на name.
    Скрываем инпуты, показываем таймер и кнопку сброса тамера.
  - В функции Получаем текущую дату и запиываем в переменную.
    Вычитаем из endDate текущую дату и результат запиываем в переменную timeLeft.
  - Запускаем setInterval и каждую 1 секунду уменьшаем timeLeft на 1.

  - На кнопку сброса добавляем слушатель события клик.
  - По клику на кнопку делаем removeInterval.
    Меняем заголовок на "Создать новый таймер обратного отсчета".
    Скрываем таймер и кнопку сброса тамера, показываем поля ввода.
    Обнуляем timeLeft.
*/

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

  today() {
    return new Date();
  }

  deadline(date) {
    return new Date(date.split('-'));
  }

  diff() {
    return this.deadline(this.targetDate) - this.today();
  }

  days() {
    return addZero(parseInt(this.diff() / (1000 * 60 * 60 * 24)));
  }
  hours() {
    return addZero(parseInt((this.diff() / (1000 * 60 * 60)) % 24));
  }
  minutes() {
    return addZero(parseInt((this.diff() / (1000 * 60)) % 60));
  }
  seconds() {
    return addZero(parseInt((this.diff() / 1000) % 60));
  }

  isTimer = () => {
    if (!localStorage.getItem('timerHeader') || !localStorage.getItem('timerDate')) {
      return;
    }
    title.textContent = localStorage.getItem('timerHeader');
    this.targetDate = localStorage.getItem('timerDate');

    toggleHide(inputBlock);
    toggleHide(outputBlock);
    toggleHide(startBtn);
    toggleHide(resetBtn);

    countdown();

    intervalId = setInterval(countdown, 1000);
    resetBtn.addEventListener('click', resetTimer, { once: true });
  }
}

const myTimer = new Timer();

function countdown() {
  if (myTimer.diff() <= 0) {
    clearInterval(intervalId);
    numbers.textContent = '0:0:0:0';
  }

  numbers.textContent = `${myTimer.days()}:${myTimer.hours()}:${myTimer.minutes()}:${myTimer.seconds()}`;
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

  if (myTimer.deadline(userDate.value) < myTimer.today) {
    alert('Укажите дату больше, чем сегодня');
    return;
  }

  toggleHide(inputBlock);
  toggleHide(outputBlock);
  toggleHide(startBtn);
  toggleHide(resetBtn);

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

  toggleHide(inputBlock);
  toggleHide(outputBlock);
  toggleHide(startBtn);
  toggleHide(resetBtn);

  title.textContent = 'Создать новый таймер обратного отсчета';
  timerHeader.value = '';
  userDate.value = '';
}

myTimer.isTimer();
startBtn.addEventListener('click', startTimer);
