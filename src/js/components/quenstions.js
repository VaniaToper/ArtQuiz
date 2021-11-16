import { images } from './images';
const categoriesCard = document.querySelectorAll('.categories__card');
const questionsImage = document.querySelector('.questions__image');
const pictureInfoImage = document.querySelector('.picture-info__image');
const pictureInfo = document.querySelector('.picture-info');
const pictureInfoName = document.querySelector('.picture-info__name');
const pictureInfoAuthor = document.querySelector('.picture-info__author');
const pictureInfoYear = document.querySelector('.picture-info__year');
const questionsChoices = document.querySelector('.questions__choices');
const questionsImgChoices = document.querySelector('.questions__images');
const congratulation = document.querySelector('.congratulation');
const congratulationBg = document.querySelector('.congratulation__bg');
const pictureAuthor = document.querySelector('.author');
const questionsButton = document.querySelectorAll('.questions__button');
const questionsImgButton = document.querySelectorAll('.questions__img');
const score = document.querySelectorAll('.score');
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
let questionsObject = {
  currentCard: 0,
  answer: 0,
  currentAnswer: 0,
  score: 0,
  imgAnswer: 0,
};

function setLocalStorage(obj) {
  const { currentCard, answer } = obj;
  for (let i = 0; i < questionsButton.length; i++) {
    localStorage.setItem(`buttonContent${i}`, questionsButton[i].innerHTML);
  }
  for (let k = 0; k < score.length; k++) {
    localStorage.setItem(`score${k}`, score[k].innerHTML);
  }
  localStorage.setItem('question', answer);
  localStorage.setItem('card', currentCard);
}
// localStorage.clear()
window.addEventListener('beforeunload', () => {
  setLocalStorage(questionsObject);
});

function getLocalStorage(obj) {
  for (let i = 0; i < questionsButton.length; i++) {
    if (localStorage.getItem(`buttonContent${i}`)) {
      questionsButton[i].innerHTML = localStorage.getItem(`buttonContent${i}`);
    }
  }
  for (let k = 0; k < score.length; k++) {
    if (localStorage.getItem(`score${k}`)) {
      score[k].innerHTML = localStorage.getItem(`score${k}`);
    }
  }
  let { currentCard, answer } = obj;
  answer = localStorage.getItem('question');
  currentCard = localStorage.getItem('card');
}
window.addEventListener('load', () => {
  getLocalStorage(questionsObject);
});

const setButtonContent = (obj) => {
  let { answer, currentCard } = obj;
  for (let k = 0; k < questionsButton.length; k++) {
    let randomAuthor = getRandomInt(240);
    if (currentCard >= 11) {
      questionsImgButton[
        k
      ].src = `assets/img/img/${images[randomAuthor].imageNum}.jpg`;
    } else {
      questionsButton[k].innerHTML = images[randomAuthor].author;
    }
  }
  let randomButton = getRandomInt(4);
  if (currentCard >= 12) {
    questionsObject.imgAnswer = randomButton
    // перевірка на яку кнопку нажали
    questionsImgButton[
      randomButton
    ].src = `assets/img/img/${images[answer].imageNum}.jpg`;
  } else {
    questionsButton[randomButton].innerHTML = images[answer].author;
  }
};
const getCategory = () => {};

const putImgToCategories = (obj) => {
  for (let i = 0; i < categoriesCard.length; i++) {
    categoriesCard[i].addEventListener('click', () => {
      let { currentCard, answer, currentAnswer } = obj;
      obj.currentCard = i;
      obj.answer = i * 10;
      obj.score = 0;
      score[currentCard].innerHTML = obj.score;
      questionsImage.src = `assets/img/img/${
        images[questionsObject.answer].imageNum
      }.jpg`;
      pictureAuthor.innerHTML = images[questionsObject.answer].author;
      pictureInfoImage.src = questionsImage.src;
      pictureInfoName.innerHTML = images[i * 10].name;
      pictureInfoAuthor.innerHTML = images[i * 10].author;
      pictureInfoYear.innerHTML = images[i * 10].year;
      obj.currentAnswer = obj.answer;
      setButtonContent(questionsObject);
      congratulation.classList.remove('congratsShowAnim');
      congratulationBg.classList.remove('congratsBgShowAnim');
    });
  }
};
putImgToCategories(questionsObject);
setButtonContent(questionsObject);

const changeQuestion = (obj) => {
  let { answer, currentAnswer } = obj;
  if (answer == currentAnswer + 10) {
    congratulation.classList.add('congratsShowAnim');
    congratulationBg.classList.add('congratsBgShowAnim');
    return;
  }
  questionsImage.src = `assets/img/img/${images[answer].imageNum}.jpg`;
  pictureInfoImage.src = questionsImage.src;
  pictureInfoName.innerHTML = images[answer].name;
  pictureInfoAuthor.innerHTML = images[answer].author;
  pictureInfoYear.innerHTML = images[answer].year;

  return questionsObject.answer;
};
changeQuestion(questionsObject);

questionsChoices.addEventListener('mousedown', (e) => {
  let { answer, currentCard } = questionsObject;
  let targetItem = e.target;
  if (targetItem.closest('.questions__button')) {
    if (targetItem.innerHTML != images[answer].author) {
      targetItem.style.background = '#B40A1B';
      targetItem.style.color = 'white';
      return;
    } else if (targetItem.innerHTML == images[answer].author) {
      targetItem.style.background = '#4BB462';
      targetItem.style.color = 'white';
      questionsObject.score += 1;
      score[currentCard].innerHTML = questionsObject.score;
      return;
    }
  }
});
questionsChoices.addEventListener('mouseup', (e) => {
  pictureInfo.classList.remove('infoHideAnim');
  pictureInfo.classList.add('infoShowAnim');
  let targetItem = e.target;
  if (targetItem.closest('.questions__button')) {
    targetItem.style.background = '#f7f7f7';
    targetItem.style.color = 'black';
  }
});
const getScore = (obj) => {
  let { currentCard } = obj;
  questionsObject.score += 1;
};

document.addEventListener('click', (event) => {
  let { answer, currentCard } = questionsObject;
  let e = pictureInfo;
  let i = questionsChoices;
  if (
    !e.contains(event.target) &&
    !i.contains(event.target) &&
    pictureInfo.classList.contains('infoShowAnim')
  ) {
    questionsObject.answer++;
    pictureInfo.classList.remove('infoShowAnim');
    pictureInfo.classList.add('infoHideAnim');
    setButtonContent(questionsObject);
    changeQuestion(questionsObject);
  }
});

questionsImgChoices.addEventListener('click', (e) => {
  let targetItem = e.target;
  if (targetItem.closest('.questions__img')) {
  }
});
