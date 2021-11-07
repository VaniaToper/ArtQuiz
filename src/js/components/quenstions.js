import { images } from './images';
const categoriesCard = document.querySelectorAll('.categories__card');
const questionsImage = document.querySelector('.questions__image');
const questionsButton = document.querySelectorAll('.questions__button');
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

function setLocalStorage() {
  for (let i = 0; i < questionsButton.length; i++) {
    localStorage.setItem(`buttonContent${i}`, questionsButton[i].innerHTML);
  }
}
window.addEventListener('beforeunload', setLocalStorage);
function getLocalStorage() {
  for (let i = 0; i < questionsButton.length; i++) {
    if (localStorage.getItem(`buttonContent${i}`)) {
      questionsButton[i].innerHTML = localStorage.getItem(`buttonContent${i}`);
    }
  }
}
window.addEventListener('load', getLocalStorage);

const putImgToCategories = () => {
  let x = 0;
  for (let i = 0; i < categoriesCard.length; i++) {
    categoriesCard[i].addEventListener('click', () => {
      for (let k = 0; k < questionsButton.length; k++) {
        let randomAuthor = getRandomInt(240);
        questionsButton[k].innerHTML = images[randomAuthor].author;

      }
      let randomButton = getRandomInt(4);
      questionsImage.src = `assets/img/img/${i * 12}.jpg`;
      questionsButton[randomButton].innerHTML = images[i * 12].author;
    });
  }
};
const checkAnswer = ()=>{
  for (let i = 0; i < questionsButton.length; i++) {
    questionsButton[i].addEventListener('click', () => {
      // if (questionsButton[i].innerHTML == )
    });
    
  }
}
checkAnswer()
putImgToCategories();
