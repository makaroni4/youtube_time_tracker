import { todayDate, yesterdayDate, thisMonth, lastMonth } from './helper_functions';

const TRACKER_STORAGE_KEY = "youtube_time_tracker_data";

const persistData = function(timer) {
  chrome.storage.local.set({ [TRACKER_STORAGE_KEY]: timer }, function() {
    log('Youtube Time Tracker is set to:');
    log(timer);
  });
}

export const readData = function(callback) {
  chrome.storage.local.get([TRACKER_STORAGE_KEY], function(result) {
    log('Youtube Time Tracker read as:');
    log(result);

    const timer = result[TRACKER_STORAGE_KEY];

    if(timer) {
      callback(timer);
    } else {
      let result = {};

      result[todayDate()] = 0;
      result[thisMonth()] = 0;

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
    const month = thisMonth();

    if(timer[today]) {
      timer[today] += increment;
    } else {
      timer[today] = increment;
    }

    if(timer[month]) {
      timer[month] += increment;
    } else {
      timer[month] = increment;
    }

    persistData(timer);

    if(callback) {
      callback(timer);
    }
  });
}
