'use strict'

import './style.css';

import { addZero, toggleHide } from "./utils.js";

const startBtn = document.querySelector('#btn');
const resetBtn = document.querySelector('#btn-reset');

const title = document.querySelector('h1');

const inputBlock = document.querySelector('.input');
const outputBlock = document.querySelector('.output');

const timerHeader = document.querySelector('#title-date');
const userDate = document.querySelector('#date');
const numbers = document.querySelector('.numbers');

let timer;

class Timer {
  constructor(date) {
    this.targetDate = date;
    this.intervalId = null;
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

  checkValues() {
    if (timerHeader.value === '') {
      alert('Введите заголовок');
      return false;
    }

    if (userDate.value === '') {
      alert('Укажите дату окончания отсчета');
      return false;
    }

    if (this.formatDeadline(userDate.value) < this.getToday()) {
      alert('Укажите дату больше, чем сегодня');
      return false;
    }

    return true;
  }

  countdown() {
    if (this.getDiff() <= 0) {
      clearInterval(intervalId);
      numbers.textContent = '0:0:0:0';
    }

    numbers.textContent = `${this.getDays()}:${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`;
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }
}


const isTimer = () => {
  const storageDate = localStorage.getItem('timerDate');
  const storageTitle = localStorage.getItem('timerHeader');

  if (!storageTitle || !storageDate) {
    return;
  }

  timer = new Timer(storageDate);
  title.textContent = storageTitle;

  toggleHide([inputBlock, outputBlock, startBtn, resetBtn]);

  timer.countdown();

  timer.intervalId = setInterval(timer.countdown.bind(timer), 1000);
  resetBtn.addEventListener('click', resetTimer, { once: true });
}


const startTimer = () => {
  timer = new Timer(userDate.value);

  if (!timer.checkValues()) {
    return;
  }

  toggleHide([inputBlock, outputBlock, startBtn, resetBtn]);

  resetBtn.addEventListener('click', resetTimer, { once: true });

  title.textContent = timerHeader.value; timer.targetDate = userDate.value;

  localStorage.setItem('timerHeader', timerHeader.value);
  localStorage.setItem('timerDate', userDate.value);

  timer.countdown();
  timer.intervalId = setInterval(timer.countdown.bind(timer), 1000);
}


const resetTimer = () => {
  timer.clearInterval();
  localStorage.removeItem('timerHeader');
  localStorage.removeItem('timerDate');

  toggleHide([inputBlock, outputBlock, startBtn, resetBtn]);

  title.textContent = 'Создать новый таймер обратного отсчета';
  timerHeader.value = '';
  userDate.value = '';
}


isTimer();
startBtn.addEventListener('click', startTimer);
