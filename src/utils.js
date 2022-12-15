export const addZero = (num) => (num < 10 && num > 0 ? `0${num}` : num);

export const toggleHide = (elem) => {
  elem.forEach((item) => {
    item.classList.toggle('hide');
  });
};
