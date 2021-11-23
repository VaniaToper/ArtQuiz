const timerSwitch = document.querySelector('.switch');
const settingsSaveButton = document.querySelector('.settings__save');
const questionsTimer = document.querySelector('.questions__timer__input');
const volumeProgress = document.querySelector('.volume__progress');
const questionsChoices = document.querySelectorAll('.questions__choices');
const questionsTimerCurrent = document.querySelector(
  '.questions__timer__current'
);
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
  setTimer();
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
  questionsChoices[0].addEventListener('click', (e) => {
    let targetItem = e.target;
    if (targetItem.closest('.questions__button')) {
      if (checkbox) {
        questionsTimer.value = 0;
        questionsTimer.max = 30;
        questionsTimerTotal.innerHTML = questionsTimer.max;
        setInterval(() => {
          questionsTimer.value = parseFloat(questionsTimer.value) + 1;
          questionsTimerCurrent.innerHTML = questionsTimer.value;
        }, 1000);
      }
    }
  });
};
