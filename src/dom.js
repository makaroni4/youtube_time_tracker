import { formatTime } from './helpers/formatting';
import {
  todayDate,
  yesterdayDate,
  thisWeek,
  lastWeek,
  thisMonth,
  lastMonth,
  thisYear,
  lastYear
} from './helpers/date';
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

        <div class="youtube-time-tracker__popup">
          <div class="youtube-time-tracker__name">
            Youtube Time Tracker
          </div>

          <ul class="youtube-time-tracker__stats">
          </ul>
        </div>
      </div>
    `.trim();

    timer.id = "youtube-time-tracker";
    timer.className = "youtube-time-tracker";

    logo.parentNode.insertBefore(timer, logo.nextSibling);
  }

  return timer;
}

const statsContent = function(timerData) {
  const today = todayDate();
  const week = thisWeek();
  const month = thisMonth();
  const year = thisYear();

  const yesterday = yesterdayDate();
  const prevWeek = lastWeek();
  const prevMonth = lastMonth();
  const prevYear = lastYear();

  let stats = "";

  if(timerData[week]) {
    stats += "<li>This week: " + formatTime(timerData[week]) + "</li>";
  }

  if(timerData[month]) {
    stats += "<li>This month: " + formatTime(timerData[month]) + "</li>";
  }

  if(timerData[year]) {
    stats += "<li>This year: " + formatTime(timerData[year]) + "</li>";
  }

  return stats;
}

export const renderTimer = function(timerData) {
  let logo = document.getElementById("logo");

  if(logo) {
    const timer = timerBlock();
    const timeBlock = timer.querySelector(".youtube-time-tracker__time");
    const statsBlock = timer.querySelector(".youtube-time-tracker__stats");

    const today = todayDate();
    const yesterday = yesterdayDate();

    if(timerData) {
      timeBlock.innerHTML = formatTime(timerData[today], timerData[yesterday]);
      statsBlock.innerHTML = statsContent(timerData);
    } else {
      readData(function(timerData) {
        timeBlock.innerHTML = formatTime(timerData[today], timerData[yesterday]);
        statsBlock.innerHTML = statsContent(timerData);
      });
    }
  }
}
