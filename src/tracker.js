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

const persistData = function(timer) {
  chrome.storage.local.set({ [TRACKER_STORAGE_KEY]: timer }, function() {
    log('YouTube Time Tracker is set to:');
    log(timer);
  });
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

    [today, week, month, year].forEach(key => {
      if(timer[key]) {
        timer[key] += increment;
      } else {
        timer[key] = increment;
      }
    });

    persistData(timer);

    if(callback) {
      callback(timer);
    }
  });
}
