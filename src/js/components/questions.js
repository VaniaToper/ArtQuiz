import { images } from './images.js';
import { setTimer, isChecked } from './settings.js';
const categoriesCard = document.querySelectorAll('.categories__card');
const questionsImage = document.querySelector('.questions__image');
const pictureInfoImage = document.querySelector('.picture-info__image');
const pictureInfo = document.querySelector('.picture-info');
const pictureInfoName = document.querySelector('.picture-info__name');
const pictureInfoAuthor = document.querySelector('.picture-info__author');
const pictureInfoYear = document.querySelector('.picture-info__year');
const questionsChoices = document.querySelectorAll('.questions__choices');
const congratulation = document.querySelector('.congratulation');
const congratulationScore = document.querySelector('.congratulation__score');
const congratulationBg = document.querySelector('.congratulation__bg');
const pictureAuthor = document.querySelector('.author');
const pictureInfoButton = document.querySelector('.picture-info__button');
const pictureInfoIndicator = document.querySelector('.picture-info__indicator');
const questionsAudioCorrect = document.querySelector(
  '.questions__audio-correct'
);
const questionsAudioWrong = document.querySelector('.questions__audio-wrong');
const questionsButton = document.querySelectorAll('.questions__button');
const questionsImgButton = document.querySelectorAll('.questions__img');
const score = document.querySelectorAll('.score');
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
export let questionsObject = {
  currentCard: 0,
  answer: 0,
  currentAnswer: 0,
  score: 0,
  imgAnswer: 0,
  currentCategory: 0,
};

function setLocalStorage(obj) {
  const { currentCard, answer } = obj;
  for (let i = 0; i < questionsButton.length; i++) {
    localStorage.setItem(`buttonContent${i}`, questionsButton[i].innerHTML);
  }
  for (let k = 0; k < score.length; k++) {
    localStorage.setItem(`score${k}`, score[k].innerHTML);
  }
  localStorage.setItem('imgAnswer', questionsObject.imgAnswer);
  localStorage.setItem('currentQuestion', questionsObject.currentAnswer);
  localStorage.setItem('card', questionsObject.currentCard);
}
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
  questionsObject.answer = localStorage.getItem('currentQuestion');
  questionsObject.currentCard = localStorage.getItem('card');
  questionsObject.currentAnswer = localStorage.getItem('currentQuestion');
  questionsObject.imgAnswer = localStorage.getItem('imgAnswer');
}

window.addEventListener('load', () => {
  getLocalStorage(questionsObject);
  setButtonContent(questionsObject);
  getCategory(questionsObject);
  setPictureInfoContent(questionsObject);
  setImageColor();
});

const checkForSameContent = () => {
  let arrButton = [];
  if (questionsObject.currentCategory == 0) {
    questionsButton.forEach((button) => {
      arrButton.push(button.innerHTML);
    });
  } else {
    questionsImgButton.forEach((button) => {
      arrButton.push(button.src);
    });
  }
  arrButton = arrButton.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });
  if (arrButton.length <= 3) {
    setButtonContent(questionsObject);
  }
};

const setButtonContent = (obj) => {
  let { answer, currentCard } = obj;
  for (let k = 0; k < questionsButton.length; k++) {
    let randomAuthor = getRandomInt(240);
    if (currentCard >= 11) {
      questionsImgButton[
        k
      ].src = `assets/img/img/${images[randomAuthor].imageNum}.jpg`;
      pictureAuthor.innerHTML = images[questionsObject.answer].author;
    } else {
      questionsImage.src = `assets/img/img/${
        images[questionsObject.answer].imageNum
      }.jpg`;
      questionsButton[k].innerHTML = images[randomAuthor].author;
    }
  }
  let randomButton = getRandomInt(4);
  if (currentCard >= 12) {
    questionsObject.imgAnswer = randomButton;
    questionsImgButton[
      randomButton
    ].src = `assets/img/img/${images[answer].imageNum}.jpg`;
  } else {
    questionsButton[randomButton].innerHTML = images[answer].author;
  }
  checkForSameContent();
  setPictureInfoContent(questionsObject);
};
const getCategory = (obj) => {
  if (obj.currentCard >= 12) {
    obj.currentCategory = 1;
  } else obj.currentCategory = 0;
};

export const putImgToCategories = (obj, cards) => {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
      let { currentCard, answer, currentAnswer } = obj;
      obj.currentCard = i;
      obj.answer = i * 10;
      obj.score = 0;
      score[currentCard].innerHTML = obj.score;
      obj.currentAnswer = obj.answer;
      setPictureInfoContent(questionsObject);
      setButtonContent(questionsObject);
      getCategory(questionsObject);
      setTimer(isChecked());
    });
  }
};
putImgToCategories(questionsObject, categoriesCard);

export const setPictureInfoContent = (obj) => {
  let { answer } = obj;
  pictureInfoImage.src = `assets/img/img/${images[answer].imageNum}.jpg`;
  pictureInfoName.innerHTML = images[answer].name;
  pictureInfoAuthor.innerHTML = images[answer].author;
  pictureInfoYear.innerHTML = images[answer].year;
};
const setImageColor = () => {
  for (let i = 0; i < categoriesCard.length; i++) {
    categoriesCard[i].style.filter = `grayscale(${
      100 - parseInt(score[i].innerHTML) * 10
    }%)`;
  }
};
const changeQuestion = (obj) => {
  let { answer, currentAnswer, score } = obj;
  categoriesCard[questionsObject.currentCard].style.filter = `grayscale(${
    100 - questionsObject.score * 10
  }%)`;
  if (answer == parseInt(currentAnswer) + 10) {
    congratulationScore.innerHTML = score + '/10';
    congratulation.classList.add('congratsShowAnim');
    congratulationBg.classList.add('congratsBgShowAnim');
    return;
  }
  pictureAuthor.innerHTML = images[questionsObject.answer].author;
  questionsImage.src = `assets/img/img/${images[answer].imageNum}.jpg`;
  setPictureInfoContent(questionsObject);
  setTimer(isChecked());
  return questionsObject.answer;
};
changeQuestion(questionsObject);

questionsChoices[0].addEventListener('mousedown', (e) => {
  let { answer, currentCard } = questionsObject;
  let targetItem = e.target;
  if (targetItem.closest('.questions__button')) {
    if (targetItem.innerHTML != images[answer].author) {
      questionsAudioWrong.play();
      pictureInfoIndicator.classList.remove('true');
      pictureInfoIndicator.classList.add('false');
      targetItem.style.background = '#B40A1B';
      targetItem.style.color = 'white';
      images[answer].isTrue = false;
      return;
    } else if (targetItem.innerHTML == images[answer].author) {
      questionsAudioCorrect.play();
      pictureInfoIndicator.classList.remove('false');
      pictureInfoIndicator.classList.add('true');
      images[answer].isTrue = true;
      targetItem.style.background = '#4BB462';
      targetItem.style.color = 'white';
      questionsObject.score += 1;
      score[currentCard].innerHTML = questionsObject.score;
      return;
    }
  }
});
questionsChoices[0].addEventListener('mouseup', (e) => {
  let { currentCategory } = questionsObject;
  pictureInfo.classList.remove('infoHideAnim');
  pictureInfo.classList.add('infoShowAnim');
  questionsImage.classList.remove('showQuestions');
  questionsImage.classList.remove('hideQuestions');
  questionsImage.classList.add('hideQuestions');
  congratulationBg.classList.add('congratsBgShowAnim');
  let targetItem = e.target;
  if (targetItem.closest('.questions__button')) {
    targetItem.style.background = '#f7f7f7';
    targetItem.style.color = 'black';
  }
});

const setPictureInfoBg = () => {
  if (images[answer].isTrue == true) {
    pictureInfoIndicator.backgroundImage = 'url("../img/checked.png")';
  } else {
    pictureInfoIndicator.backgroundImage = 'none';
  }
};

export const hidePictureInfo = () => {
  document.addEventListener('click', (event) => {
    let { answer, currentCard, currentCategory } = questionsObject;
    if (
      congratulationBg.contains(event.target) ||
      (pictureInfoButton.contains(event.target) &&
        pictureInfo.classList.contains('infoShowAnim'))
    ) {
      questionsObject.answer++;
      pictureInfo.classList.remove('infoShowAnim');
      congratulationBg.classList.remove('congratsBgShowAnim');
      setButtonContent(questionsObject);
      pictureInfo.classList.add('infoHideAnim');
      changeQuestion(questionsObject);
      questionsImage.classList.remove('hideQuestions');
      questionsImage.classList.remove('showQuestions');
      questionsImage.classList.add('showQuestions');
    }
  });
};
hidePictureInfo();
questionsChoices[1].addEventListener('click', (e) => {
  let { currentCategory } = questionsObject;
  pictureInfo.classList.remove('infoHideAnim');
  pictureInfo.classList.add('infoShowAnim');
  congratulationBg.classList.add('congratsBgShowAnim');
  let targetItem = e.target;
  if (targetItem.closest('.questions__img')) {
    if (
      questionsImgButton[questionsObject.imgAnswer] ==
      targetItem.closest('.questions__img')
    ) {
      questionsAudioCorrect.play();
      pictureInfoIndicator.classList.remove('false');
      pictureInfoIndicator.classList.add('true');
      images[answer].isTrue = true;
      questionsObject.score += 1;
      score[questionsObject.currentCard].innerHTML = questionsObject.score;
    } else {
      questionsAudioWrong.play();
      pictureInfoIndicator.classList.remove('true');
      pictureInfoIndicator.classList.add('false');
      images[answer].isTrue = false;
    }
  }
});
