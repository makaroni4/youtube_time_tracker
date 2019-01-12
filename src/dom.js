import { todayDate, yesterdayDate, formatTime } from './helper_functions';
import { readData } from './tracker';

const timerBlock = function() {
  const logo = document.getElementById("logo");
  let timer = document.getElementById("youtube-time-tracker-timer");

  if(!timer) {
    timer = document.createElement("div");
    timer.id = "youtube-time-tracker-timer";
    timer.className = "youtube-time-tracker";

    logo.parentNode.insertBefore(timer, logo.nextSibling);
  }

  return timer;
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
