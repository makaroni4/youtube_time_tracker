import { todayDate, yesterdayDate } from './helper_functions';

const TRACKER_STORAGE_KEY = "youtube_time_tracker_data";

const persistData = function(timer) {
  chrome.storage.local.set({ [TRACKER_STORAGE_KEY]: timer }, function() {
    console.log('Youtube Time Tracker is set to:');
    console.dir(timer);
  });
}

export const readData = function(callback) {
  chrome.storage.local.get([TRACKER_STORAGE_KEY], function(result) {
    console.log('Youtube Time Tracker read as:');
    console.dir(result);

    const timer = result[TRACKER_STORAGE_KEY];

    if(timer) {
      callback(timer);
    } else {
      const today = new Date().toISOString().slice(0, 10);

      let result = {};
      result[today] = 0;

      callback(result);
    }
  });
}


export const incrementTime = function(increment, callback) {
  readData(function(timer) {
    const today = todayDate();

    if(timer[today]) {
      timer[today] += increment;
    } else {
      timer[today] = increment;
    }

    persistData(timer);

    if(callback) {
      callback(timer);
    }
  });
}
