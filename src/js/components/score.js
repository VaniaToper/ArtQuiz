import {
  putImgToCategories,
  setPictureInfoContent,
  questionsObject,
  hidePictureInfo,
} from './questions';
import { images } from './images';
const scoreImage = document.querySelectorAll('.score__image');
const scoreContainer = document.querySelector('#score__container');
const scoreQuestionsContainer = document.querySelector(
  '.score-questions__container'
);
const scoreQuestionsSection = document.querySelector(
  '.score-questions__section'
);
const pictureInfo = document.querySelector('.picture-info');
const congratulationBg = document.querySelector('.congratulation__bg');
const scoreObject = {
  answer: 0,
};
const setLocalStorage = () => {
  localStorage.setItem('scoreQuestions', scoreQuestionsContainer.innerHTML);
};
window.addEventListener('beforeunload', () => {
  setLocalStorage(questionsObject);
});
const getLocalStorage = () => {
  scoreQuestionsContainer.innerHTML = localStorage.getItem('scoreQuestions');
};
window.addEventListener('load', () => {
  getLocalStorage();
});
putImgToCategories(questionsObject, scoreImage);
scoreImage.forEach((card) => {
  card.addEventListener('click', () => {
    createImg(questionsObject);
  });
});

const createImg = (obj) => {
  scoreQuestionsContainer.innerHTML = '';
  let { answer } = obj;
  console.log(scoreObject.answer);

  for (let i = answer; i < answer + 10; i++) {
    console.log(scoreObject.answer);
    scoreObject.answer = i;
    const questionsImage = document.createElement('img');
    questionsImage.classList = 'score__questions-images';
    if (images[scoreObject.answer].isTrue == true) {
      questionsImage.classList.add('score__questions-images__true');
    }
    questionsImage.src = `assets/img/img/${
      images[scoreObject.answer].imageNum
    }.jpg`;
    scoreQuestionsContainer.append(questionsImage);
  }
};
const showPictureInfo = () => {
  scoreQuestionsContainer.addEventListener('click', (e) => {
    console.log(scoreObject.answer);
    let targetItem = e.target;
    if (targetItem.closest('.score__questions-images')) {
      setPictureInfoContent(scoreObject);
      pictureInfo.classList.remove('infoHideAnim');
      pictureInfo.classList.add('infoShowAnim');
      congratulationBg.classList.remove('congratsBgShowAnim');
      congratulationBg.classList.add('congratsBgShowAnim');
    }
  });
};
showPictureInfo();
// hidePictureInfo();
