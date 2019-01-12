const TRACKER_STORAGE_KEY = "youtube_time_tracker_data";

export const readData = function() {
  var trackerData = window.localStorage.getItem(TRACKER_STORAGE_KEY);

  if(trackerData) {
    trackerData = JSON.parse(trackerData);

    return trackerData;
  } else {
    let today = new Date().toISOString().slice(0, 10);
    let result = {};
    result[today] = 0;

    return result;
  }
}

export const persistData = function(timer) {
  window.localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(timer));
}

export const incrementTime = function() {
  var trackerData = readData();
  let today = new Date().toISOString().slice(0, 10);

  if(trackerData[today]) {
    trackerData[today] = parseFloat(trackerData[today]) + 0.5;
  } else {
    trackerData[today] = 0.5;
  }

  persistData(trackerData);
  showTimer();
}
