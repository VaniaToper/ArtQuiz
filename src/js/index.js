const welcomeSection = document.querySelector('.welcome');
const settingsSection = document.querySelector('.settings');
const artistsCategoriesSection = document.querySelector('.artists__categories');
const pictureCategoriesSection = document.querySelector('.picture__categories');
const artistsQuestionsSection = document.querySelector('.artists__questions');
const pictureQuestionsSection = document.querySelector('.picture__questions');
const settingsButton = document.querySelector('.art__header__settings');
const homeButton = document.querySelector('.art__home');
const scoreButton = document.querySelector('.art__score');
const categoryButton = document.querySelector('.art__category');
const artistButton = document.querySelector('.artist');
const pictureButton = document.querySelector('.picture');
const hideBlocks = document.querySelectorAll('.hide__block');
const congratulationButton = document.querySelector('.congratulation__button');
const artistsCategoriesCard = document.querySelectorAll('.artists__card');
const pictureCategoriesCard = document.querySelectorAll('.picture__card');
const congratulation = document.querySelector('.congratulation');
const congratulationBg = document.querySelector('.congratulation__bg');
const scoreSection = document.querySelector('.score__section');
const scoreContainer = document.querySelector('.score__container');
const artHeaderNav = document.querySelector('.art__header__nav');
const welcomeContent = document.querySelector('.welcome__content');
const headerButtons = artHeaderNav.querySelectorAll('button');
const scoreImage = document.querySelectorAll('.score__image');
const welcomeCardText = document.querySelectorAll('.welcome__card__text');
const categoriesCardImage = document.querySelectorAll(
  '.categories__card__image'
);
const scoreQuestionsSection = document.querySelector(
  '.score-questions__section'
);
const currentUnHideBlock = localStorage.getItem('currentHideBlock');

const pageObject = {
  currentSection: 0,
};

const highlightHeader = () => {
  headerButtons.forEach((button) => {
    button.classList.remove('highlight');
  });
  headerButtons[pageObject.currentSection].classList.add('highlight');
};

const cardsAnim = () => {
  categoriesCardImage.forEach((card) => {
    card.classList.remove('cardsAnim');
  });
  for (let i = 0; i < categoriesCardImage.length; i += 2) {
    categoriesCardImage[i].classList.add('cardsAnim');
  }
  setTimeout(() => {
    for (let i = 1; i < categoriesCardImage.length; i += 2) {
      categoriesCardImage[i].classList.add('cardsAnim');
    }
  }, 400);
};

const animWelcomeCard = () => {
  welcomeCardText.forEach((text) => {
    text.classList.remove('textAnim');
    text.classList.add('textAnim');
  });
  welcomeContent.classList.remove('welcomeCardsAnim');
  welcomeContent.classList.add('welcomeCardsAnim');
};

const switchPage = (block = welcomeSection) => {
  if (!block) block = welcomeSection;
  for (let i = 0; i < hideBlocks.length; i++) {
    hideBlocks[i].classList.add('hide');
  }
  if (block == welcomeSection) {
    animWelcomeCard();
    pageObject.currentSection = 0;
  }
  if (block == pictureCategoriesSection || block == artistsCategoriesSection) {
    cardsAnim();
    pageObject.currentSection = 1;
  }
  if (block == scoreSection) pageObject.currentSection = 2;
  block.classList.remove('hide');
  block.classList.add('changePage');

  localStorage.setItem('currentHideBlock', block.classList[0]);
  highlightHeader();
};
switchPage(document.querySelector(`.${currentUnHideBlock}`));

settingsButton.addEventListener('click', () => {
  switchPage(settingsSection);
});
homeButton.addEventListener('click', () => {
  switchPage(welcomeSection);
});
artistButton.addEventListener('click', () => {
  switchPage(artistsCategoriesSection);
  let k = -1;
  const animCardInterval = setInterval(() => {
    if (k < 11) {
      k++;
      artistsCategoriesCard[k].classList.add('changePage');
    } else {
      clearInterval(animCardInterval);
    }
  }, 200);
});
pictureButton.addEventListener('click', () => {
  switchPage(pictureCategoriesSection);
});
congratulationButton.addEventListener('click', () => {
  switchPage(artistsCategoriesSection);
  congratulation.classList.remove('congratsShowAnim');
  congratulationBg.classList.remove('congratsBgShowAnim');
});
artistsCategoriesSection.addEventListener('click', (e) => {
  let targetItem = e.target;
  if (targetItem.closest('.artists__card')) {
    switchPage(artistsQuestionsSection);
  }
});

pictureCategoriesSection.addEventListener('click', (e) => {
  let targetItem = e.target;
  if (targetItem.closest('.picture__card')) {
    switchPage(pictureQuestionsSection);
  }
});

categoryButton.addEventListener('click', () => {
  switchPage(artistsCategoriesSection);
});

scoreButton.addEventListener('click', () => {
  switchPage(scoreSection);
});

scoreContainer.addEventListener('click', (e) => {
  let targetItem = e.target;
  if (targetItem.closest('.score__image')) {
    switchPage(scoreQuestionsSection);
  }
});
