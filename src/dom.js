import { todayDate, yesterdayDate, formatTime } from './helper_functions';
import { readData } from './tracker';

const timerBlock = function() {
  const logo = document.getElementById("logo");
  let timer = document.getElementById("youtube-time-tracker");

  if(!timer) {
    timer = document.createElement("div");

    timer.innerHTML = `
      <div class="youtube-time-tracker__body">
        <div class="youtube-time-tracker__stopwatch-icon">
        </div>

        <div class="youtube-time-tracker__time">
        </div>
      </div>
    `.trim();

    timer.id = "youtube-time-tracker";
    timer.className = "youtube-time-tracker";

    logo.parentNode.insertBefore(timer, logo.nextSibling);
  }

  return timer.querySelector(".youtube-time-tracker__time");
}

export const showTimer = function(timerData) {
  let logo = document.getElementById("logo");

  if(logo) {
    const timer = timerBlock();

    const today = todayDate();
    const yesterday = yesterdayDate();

    if(timerData) {
      timer.innerHTML = formatTime(timerData[today], timerData[yesterday]);
    } else {
      readData(function(timerData) {
        timer.innerHTML = formatTime(timerData[today], timerData[yesterday]);
      });
    }
  }
}
