const welcomeSection = document.querySelector('.welcome');
const settingsSection = document.querySelector('.settings');
const artistsCategoriesSection = document.querySelector('.artists__categories');
const pictureCategoriesSection = document.querySelector('.picture__categories');
const artistsQuestionsSection = document.querySelector('.artists__questions');
const pictureQuestionsSection = document.querySelector('.picture__questions');
const settingsButton = document.querySelector('.welcome__button');
const homeButton = document.querySelector('.art__home');
const scoreButton = document.querySelector('.art__score');
const categoryButton = document.querySelector('.art__category');
const artistButton = document.querySelector('.artist');
const pictureButton = document.querySelector('.picture');
const hideBlocks = document.querySelectorAll('.hide__block');
const currentSection = document.querySelector('.current-section');
const congratulationButton = document.querySelector('.congratulation__button');
const currentUnHideBlock = localStorage.getItem('currentHideBlock');
const artistsCategoriesCard = document.querySelectorAll('.artists__card');
const pictureCategoriesCard = document.querySelectorAll('.picture__card');
const congratulation = document.querySelector('.congratulation');
const congratulationBg = document.querySelector('.congratulation__bg');
const scoreSection = document.querySelector('.score__section')
const switchPage = (block = welcomeSection) => {
  if (!block) block = welcomeSection;
  for (let i = 0; i < hideBlocks.length; i++) {
    hideBlocks[i].classList.add('hide');
  }
  block.classList.remove('hide');
  block.classList.add('changePage');
  localStorage.setItem('currentHideBlock', block.classList[0]);
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

categoryButton.addEventListener('click',()=>{
  switchPage(artistsCategoriesSection)
})

scoreButton.addEventListener('click',()=>{
  switchPage(scoreSection)
})