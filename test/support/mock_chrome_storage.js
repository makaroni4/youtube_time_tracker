export const mockChromeStorage = function(trackerData) {
  global.chrome = {
    storage: {
      local: {
        get: (key, callback) => {
          callback({
            "youtube_time_tracker_data": trackerData
          });
        },
        set: (data, callback) => {
        }
      }
    }
  };
};
