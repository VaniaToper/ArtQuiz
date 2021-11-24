const timerSwitch = document.querySelector('.switch');
const settingsSaveButton = document.querySelector('.settings__save');
const questionsTimer = document.querySelector('.questions__timer__input');
const volumeProgress = document.querySelector('.volume__progress');
const questionsChoices = document.querySelectorAll('.questions__choices');
const cardTimerIntervals = document.querySelectorAll('.card__timer__intervals');
const pictureInfo = document.querySelector('.picture-info');
const congratulationBg = document.querySelector('.congratulation__bg');
const pictureInfoIndicator = document.querySelector('.picture-info__indicator');
const pictureInfoButton = document.querySelector('.picture-info__button');
const questionsTimerCurrent = document.querySelector(
  '.questions__timer__current'
);
const artistsQuestionsSection = document.querySelector('.artists__questions');
const pictureQuestionsSection = document.querySelector('.picture__questions');
const questionsTimerTotal = document.querySelector('.questions__timer__total');
const questionsAudioCorrect = document.querySelector(
  '.questions__audio-correct'
);
const questionsAudioWrong = document.querySelector('.questions__audio-wrong');
function setLocalStorage() {
  let timerChecked = isChecked();
  localStorage.setItem('volume', volumeProgress.value);
  localStorage.setItem('timer', timerChecked);
}
settingsSaveButton.addEventListener('click', setLocalStorage);

function getLocalStorage() {
  timerSwitch.checked = localStorage.getItem('timer');
  volumeProgress.value = localStorage.getItem('volume');
}
window.addEventListener('load', () => {
  getLocalStorage();
  if (
    !artistsQuestionsSection.classList.contains('hide') ||
    !pictureQuestionsSection.classList.contains('hide')
  ) {
    setTimer(isChecked());
  }
});

export const isChecked = () => {
  if (timerSwitch.checked) return true;
  else return '';
};
volumeProgress.addEventListener('change', () => {
  questionsAudioCorrect.volume = volumeProgress.value;
  questionsAudioWrong.volume = volumeProgress.value;
});
export const setTimer = (checkbox) => {
  if (checkbox) {
    questionsTimer.value = 0;
    questionsTimer.max = 30;
    questionsTimerTotal.innerHTML = questionsTimer.max;
    const timer = setInterval(() => {
      questionsTimer.value = parseFloat(questionsTimer.value) + 1;
      questionsTimerCurrent.innerHTML = questionsTimer.value;
      questionsChoices[0].addEventListener('click', () => {
        clearInterval(timer);
        questionsTimer.value = 0;
        questionsTimerCurrent.innerHTML = 0;
      });
      questionsChoices[1].addEventListener('click', () => {
        clearInterval(timer);
        questionsTimer.value = 0;

        questionsTimerCurrent.innerHTML = 0;
      });
      if (questionsTimer.value == 30) {
        questionsAudioWrong.play();
        pictureInfoIndicator.classList.remove('true');
        pictureInfoIndicator.classList.add('false');
        pictureInfo.classList.remove('infoHideAnim');
        pictureInfo.classList.add('infoShowAnim');
        congratulationBg.classList.add('congratsBgShowAnim');
        clearInterval(timer);
      }
    }, 1000);
  }
};

document.addEventListener('click', (event) => {
  if (
    congratulationBg.contains(event.target) ||
    (pictureInfoButton.contains(event.target) &&
      pictureInfo.classList.contains('infoShowAnim'))
  ) {
    setTimer(isChecked());
  }
});
