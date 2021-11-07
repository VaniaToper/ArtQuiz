const welcomeSection = document.querySelector('.welcome');
const settingsSection = document.querySelector('.settings');
const artistsCategoriesSection = document.querySelector('.artists__categories');
const pictureCategoriesSection = document.querySelector('.picture__categories');
const artistsQuestionsSection = document.querySelector('.artists__questions');
const settingsButton = document.querySelector('.welcome__button');
const cardButton = document.querySelectorAll('.categories__card');
const homeButton = document.querySelector('.art__home');
const artistButton = document.querySelector('.artist');
const pictureButton = document.querySelector('.picture');
const hideBlocks = document.querySelectorAll('.hide__block');
const currentSection = document.querySelector('.current-section');
const currentUnHideBlock = localStorage.getItem('currentHideBlock');

const switchPage = (block = welcomeSection) => {
  if (!block) block = welcomeSection;
  for (let i = 0; i < hideBlocks.length; i++) {
    hideBlocks[i].classList.add('hide');
  }
  block.classList.remove('hide');
  if (welcomeSection.classList.contains('hide')) {
    homeButton.classList.remove('hide');
  }
  blockContent = block.outerHTML;
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
});
pictureButton.addEventListener('click', () => {
  switchPage(pictureCategoriesSection);
});

for (let i = 0; i < cardButton.length; i++) {
  cardButton[i].addEventListener('click', () => {
    switchPage(artistsQuestionsSection);
  });
}
