import { formatTime, uplift } from './helpers/formatting';
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
import { getCookie, setCookie } from './helpers/cookie';

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
          <div class="youtube-time-tracker__popup-body">
            <div class="youtube-time-tracker__name">
              Youtube Time Tracker
            </div>

            <ul class="youtube-time-tracker__stats">
            </ul>

            <div class="youtube-time-tracker__links">
              <a class="youtube-time-tracker__link secondary-link"
                href="https://github.com/makaroni4/youtube_time_tracker"
                target="_blank">
                Source code
              </a>

              <a class="youtube-time-tracker__link secondary-link"
                href="http://bit.ly/YTT-feedback"
                starget="_blank">
                Feedback
              </a>
            </div>
          </div>

          <div class="youtube-time-tracker__rating">
            <div class="youtube-time-tracker__rating-description">
              If you like the extension – please, spread the word & rate it in Chrome Web Store:
            </div>

            <div class="youtube-time-tracker__rating-cta">
              <a href="http://bit.ly/rate-YTT"
                 class="youtube-time-tracker__rating-button"
                 target="_blank">
                RATE IT
              </a>

              <a href="#"
                 class="secondary-link youtube-time-tracker__rating-later js-hide-ytt-rating">
                Later
              </a>
            </div>
          </div>
        </div>
      </div>
    `.trim();

    timer.id = "youtube-time-tracker";
    timer.className = "youtube-time-tracker";

    logo.parentNode.insertBefore(timer, logo.nextSibling);

    const ratingBlock = document.querySelector(".youtube-time-tracker__rating");
    const closeLink = ratingBlock.querySelector(".js-hide-ytt-rating");
    const ratingCookie = "ytt-rating";

    if(!getCookie(ratingCookie)) {
      ratingBlock.classList.add("youtube-time-tracker__rating--active");
    }

    closeLink.addEventListener("click", function(e) {
      e.preventDefault();

      ratingBlock.remove();

      setCookie(ratingCookie, true, 180);
    });
  }

  return timer;
}

const upliftModifier = function(prevTime, currentTime) {
  if(prevTime === undefined) {
    return "";
  }

  return prevTime > currentTime ? "ytt-stat__uplift--green" : "ytt-stat__uplift--red";
}

const renderStat = function(timerData, name, key, prevKey) {
  let output = "";

  if(timerData[key]) {
    output += `
      <li>
        <div class="ytt-stat">
          <div class="ytt-stat__time">
            ${name}: ${formatTime(timerData[key])}
          </div>

          <div class="ytt-stat__uplift ${upliftModifier(timerData[key], timerData[prevKey])}">
            ${uplift(timerData[key], timerData[prevKey]) || ""}
          </div>
        </div>
      </li>
    `
  }

  return output;
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

  stats += renderStat(timerData, "This week", week, prevWeek);
  stats += renderStat(timerData, "This month", month, prevMonth);
  stats += renderStat(timerData, "This year", year, prevYear);

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
