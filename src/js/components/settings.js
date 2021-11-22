const timerSwitch = document.querySelector('.switch');
const settingsSaveButton = document.querySelector('.settings__save');
const questionsTimer = document.querySelector('.questions__timer__input');
const volumeProgress = document.querySelector('.volume__progress');
const questionsTimerCurrent = document.querySelector(
  '.questions__timer__current'
);
const questionsTimerTotal = document.querySelector('.questions__timer__total');

function setLocalStorage() {
  let timerChecked = isChecked();
  localStorage.setItem('volume', volumeProgress.value)
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

export const setTimer = (checkbox) => {
  if (checkbox) {
    questionsTimer.value = 0;
    questionsTimer.max = 30;
    questionsTimerTotal.innerHTML = questionsTimer.max;
    setInterval(() => {
      questionsTimer.value = parseFloat(questionsTimer.value) + 1;
      questionsTimerCurrent.innerHTML = questionsTimer.value;
    }, 1000);
  }
};
