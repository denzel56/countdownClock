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

const timerHader = document.querySelector('#title-date');
const userDate = document.querySelector('#date');
let endDate = null;

const startTimer = (e) => {
  if (timerHader.value === '') {
    alert('Введите заголовок');

    return;
  }

  if (userDate.value === '') {
    alert('Укажите дату окончания отсчета');

    return;
  }

  inputBlock.classList.toggle('hide');
  outputBlock.classList.toggle('hide');

  startBtn.classList.toggle('hide');
  resetBtn.classList.toggle('hide');

  resetBtn.addEventListener('click', reserTimer, { once: true });
  startBtn.removeEventListener('click', startTimer);

  title.innerText = timerHader.value;
  endDate = userDate.value;
  console.log("🚀 ~ file: index.js ~ line 54 ~ startTimer ~ endDate", endDate)
}

const reserTimer = (e) => {
  inputBlock.classList.toggle('hide');
  outputBlock.classList.toggle('hide');

  startBtn.classList.toggle('hide');
  resetBtn.classList.toggle('hide');

  startBtn.addEventListener('click', startTimer);

  title.innerText = 'Создать новый таймер обратного отсчета';
  timerHader.value = '';
  userDate.value = '';
}

startBtn.addEventListener('click', startTimer)
