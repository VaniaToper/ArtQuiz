import { images } from './images';
const categoriesCard = document.querySelectorAll('.categories__card');
const questionsImage = document.querySelector('.questions__image');
const pictureInfoImage = document.querySelector('.picture-info__image');
const pictureInfo = document.querySelector('.picture-info');
const pictureInfoName = document.querySelector('.picture-info__name');
const pictureInfoAuthor = document.querySelector('.picture-info__author');
const pictureInfoYear = document.querySelector('.picture-info__year');
const questionsChoices = document.querySelector('.questions__choices');
const questionsButton = document.querySelectorAll('.questions__button');
const ask = document.querySelector('.ask');
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

function setLocalStorage() {
  for (let i = 0; i < questionsButton.length; i++) {
    localStorage.setItem(`buttonContent${i}`, questionsButton[i].innerHTML);
  }
  localStorage.setItem('question', ask.innerHTML);
}
window.addEventListener('beforeunload', setLocalStorage);
function getLocalStorage() {
  for (let i = 0; i < questionsButton.length; i++) {
    if (localStorage.getItem(`buttonContent${i}`)) {
      questionsButton[i].innerHTML = localStorage.getItem(`buttonContent${i}`);
    }
  }
  ask.innerHTML = localStorage.getItem('question');
}
window.addEventListener('load', getLocalStorage);

const putImgToCategories = () => {
  for (let i = 0; i < categoriesCard.length; i++) {
    categoriesCard[i].addEventListener('click', () => {
      questionsImage.src = `assets/img/img/${images[i * 12].imageNum}.jpg`;
      pictureInfoImage.src = questionsImage.src;
      pictureInfoName.innerHTML = images[i * 12].name;
      pictureInfoAuthor.innerHTML = images[i * 12].author;
      pictureInfoYear.innerHTML = images[i * 12].year;
      ask.innerHTML = i * 12;
      console.log((ask.innerHTML = i * 12));
      setButtonContent(i * 12);
    });
  }
};
putImgToCategories();
const changeQuestion = () => {
  ask.innerHTML = parseInt(ask.innerHTML) + 1;
  questionsImage.src = `assets/img/img/${images[ask.innerHTML].imageNum}.jpg`;
  pictureInfoImage.src = questionsImage.src;
  pictureInfoName.innerHTML = images[ask.innerHTML].name;
  pictureInfoAuthor.innerHTML = images[ask.innerHTML].author;
  pictureInfoYear.innerHTML = images[ask.innerHTML].year;
};

const checkAnswer = (answer, index) => {
  pictureInfo.classList.remove('infoHideAnim');
  pictureInfo.classList.add('infoShowAnim');
  questionsButton[index].style.color = '#f0f0f0';
  if (questionsButton[index].innerHTML != answer) {
    questionsButton[index].style.fontWeight = '600';
    questionsButton[index].style.background = '#B40A1B';
  } else if (questionsButton[index].innerHTML == answer) {
    
    questionsButton[index].style.background = '#4BB462';
  }
};

const setButtonContent = (answer = 0) => {
  console.log(answer);
  for (let k = 0; k < questionsButton.length; k++) {
    let randomAuthor = getRandomInt(240);
    questionsButton[k].innerHTML = images[randomAuthor].author;
    console.log(images[answer].author);
    if (
      questionsButton[k].innerHTML == images[answer].author
    ) {
      console.log('ad');
      console.log(images[answer].author, questionsButton[k]);
      questionsButton[k].innerHTML = images[randomAuthor + 1].author;
    }
  }
  let randomButton = getRandomInt(4);
  questionsButton[randomButton].innerHTML = images[answer].author;
  questionsButton.forEach((button, k) => {
    button.addEventListener('click', () => {
      if (questionsImage.classList.contains('changePhotoAnim')) {
        questionsImage.classList.remove('changePhotoAnim');
      }
      questionsImage.classList.add('changePhotoAnim');
      checkAnswer(images[answer].author, k);
      setTimeout(() => {
        questionsButton.forEach((x) => {
          x.style.background = '#f7f7f7';
          x.style.color = '#000';
          x.style.fontWeight = '400';
        });
      }, 100);
    });
  });
  // return answer;
};
setButtonContent();

document.addEventListener('click', (event) => {
  let e = pictureInfo;
  let i = questionsChoices;
  if (
    !e.contains(event.target) &&
    !i.contains(event.target) &&
    pictureInfo.classList.contains('infoShowAnim')
  ) {
    pictureInfo.classList.remove('infoShowAnim');
    pictureInfo.classList.add('infoHideAnim');
    console.log(ask.innerHTML);
    setButtonContent(parseInt(ask.innerHTML) + 1);
    changeQuestion();
  }
});
