'use strict'

export const addZero = (num) => {
  return num < 10 && num > 0 ? `0${num}` : num;
}

export const toggleHide = (elem) => {
  elem.forEach(item => {
    item.classList.toggle('hide');
  });
}
