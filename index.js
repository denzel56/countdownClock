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
const startBtn = document.querySelector('#btn');
const resetBtn = document.querySelector('#btn-reset');

const title = document.querySelector('h1');

const inputBlock = document.querySelector('.input');
const outputBlock = document.querySelector('.output');

const timerHeader = document.querySelector('#title-date');
const userDate = document.querySelector('#date');
const numbers = document.querySelector('.numbers');

let targetDate = null;
let intervalId = null;

const toggleHide = () => {
  inputBlock.classList.toggle('hide');
  outputBlock.classList.toggle('hide');

  startBtn.classList.toggle('hide');
  resetBtn.classList.toggle('hide');
}

const addZero = (num) => {
  return num < 10 && num > 0 ? `0${num}` : num;
}

const countdown = () => {
  const deadline = new Date(targetDate.split('-'));
  const today = new Date();
  const diff = deadline - today;

  if (diff <= 0) {
    clearInterval(intervalId);

    numbers.textContent = '0:0:0:0';
  }

  const days = addZero(parseInt(diff / (1000 * 60 * 60 * 24)));
  const hours = addZero(parseInt((diff / (1000 * 60 * 60)) % 24));
  const minutes = addZero(parseInt((diff / (1000 * 60)) % 60));
  const seconds = addZero(parseInt((diff / 1000) % 60));

  numbers.textContent = `${days}:${hours}:${minutes}:${seconds}`;
}

const isTimer = () => {
  if (!localStorage.getItem('timerHeader') || !localStorage.getItem('timerDate')) {
    return;
  }
  title.textContent = localStorage.getItem('timerHeader');
  targetDate = localStorage.getItem('timerDate');

  toggleHide();
  countdown();

  intervalId = setInterval(countdown, 1000);

  resetBtn.addEventListener('click', reserTimer, { once: true });
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

  const deadline = new Date(userDate.value.split('-'));

  if (deadline < new Date()) {
    alert('Укажите дату больше, чем сегодня');

    return;
  }

  toggleHide();

  resetBtn.addEventListener('click', reserTimer, { once: true });

  title.textContent = timerHeader.value;
  targetDate = userDate.value;

  localStorage.setItem('timerHeader', timerHeader.value);
  localStorage.setItem('timerDate', userDate.value);

  countdown();

  intervalId = setInterval(countdown, 1000);
}

const reserTimer = () => {
  clearInterval(intervalId);
  localStorage.removeItem('timerHeader');
  localStorage.removeItem('timerDate');

  toggleHide();

  title.textContent = 'Создать новый таймер обратного отсчета';
  timerHeader.value = '';
  userDate.value = '';
}

isTimer();
startBtn.addEventListener('click', startTimer);
