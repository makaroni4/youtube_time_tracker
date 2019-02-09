import { log } from './helpers/log';
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

const TRACKER_STORAGE_KEY = "youtube_time_tracker_data";

const persistData = function(timer, callback) {
  chrome.storage.local.set({ [TRACKER_STORAGE_KEY]: timer }, function() {
    log('YouTube Time Tracker is set to:');
    log(timer);

    if(callback) {
      callback(timer);
    }
  });
}

const cleanUpOldKeys = function(timer) {
  const allowedKeys = new Set([
    todayDate(),
    thisWeek(),
    thisMonth(),
    thisYear(),
    yesterdayDate(),
    lastWeek(),
    lastMonth(),
    lastYear(),
    "installed_at",
    "time_watched"
  ]);

  Object.keys(timer)
    .filter(key => !allowedKeys.has(key))
    .forEach(key => delete timer[key]);
}

export const readData = function(callback) {
  chrome.storage.local.get([TRACKER_STORAGE_KEY], function(result) {
    log('YouTube Time Tracker read as:');
    log(result);

    const timer = result[TRACKER_STORAGE_KEY];

    if(timer) {
      callback(timer);
    } else {
      let result = {};

      result[todayDate()] = 0;
      result[thisWeek()] = 0;
      result[thisMonth()] = 0;
      result[thisYear()] = 0;

      callback(result);
    }
  });
}

export const incrementTime = function(increment, callback) {
  if (document.visibilityState === "hidden") {
    return;
  }

  readData(function(timer) {
    const today = todayDate();
    const week  = thisWeek();
    const month = thisMonth();
    const year  = thisYear();

    if(!timer["time_watched"]) {
      timer["time_watched"] = (timer[lastYear()] || 0) + (timer[year] || 0);
    }

    [today, week, month, year, "time_watched"].forEach(key => {
      if(timer[key]) {
        timer[key] += increment;
      } else {
        timer[key] = increment;
      }
    });

    if(!timer["installed_at"]) {
      timer["installed_at"] = today;
    }

    cleanUpOldKeys(timer);

    persistData(timer, callback);
  });
}
