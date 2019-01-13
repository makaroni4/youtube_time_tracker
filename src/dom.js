import { todayDate, yesterdayDate, thisMonth, lastMonth, formatTime } from './helper_functions';
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

        <div class="youtube-time-tracker__stats">
        </div>
      </div>
    `.trim();

    timer.id = "youtube-time-tracker";
    timer.className = "youtube-time-tracker";

    logo.parentNode.insertBefore(timer, logo.nextSibling);
  }

  return timer;
}

export const renderTimer = function(timerData) {
  let logo = document.getElementById("logo");

  if(logo) {
    const timer = timerBlock();
    const timeBlock = timer.querySelector(".youtube-time-tracker__time");
    const statsBlock = timer.querySelector(".youtube-time-tracker__stats");

    const today = todayDate();
    const yesterday = yesterdayDate();
    const month = thisMonth();
    const prevMonth = thisMonth();

    if(timerData) {
      timeBlock.innerHTML = formatTime(timerData[today], timerData[yesterday]);
      statsBlock.innerHTML = "This month: " + formatTime(timerData[month]);
    } else {
      readData(function(timerData) {
        timeBlock.innerHTML = formatTime(timerData[today], timerData[yesterday]);
        statsBlock.innerHTML = "This month: " + formatTime(timerData[month]);
      });
    }
  }
}
