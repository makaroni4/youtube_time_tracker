const tk = require('timekeeper');

import { readData, incrementTime } from '../../src/tracker';
import { mockChromeStorage } from '../support/mock_chrome_storage';

describe('readData', () => {
  beforeEach(() => {
    tk.freeze("Sun Jan 13 2019 20:38:45 GMT+0100 (Central European Standard Time)");
  });

  afterEach(() => {
    tk.reset();
  });

  describe('when chrome.storage has data', () => {
    const trackerData = {
      "2019": 100.2,
      "jan-2019": 100.2,
      "2-2019": 100.2,
      "2019-01-13": 100.2
    };

    beforeEach(() => {
      mockChromeStorage(trackerData);
    });

    it('calls callback function with timer data', () => {
      const callback = jest.fn();

      readData(callback);

      expect(callback).toHaveBeenCalledWith(trackerData);
    });
  });

  describe('when chrome.storage has no data', () => {
    beforeEach(() => {
      mockChromeStorage(null);
    });

    it('sets todays and this month keys to 0', () => {
      const callback = jest.fn();

      readData(callback);

      expect(callback).toHaveBeenCalledWith({
        "2019": 0,
        "jan-2019": 0,
        "2-2019": 0,
        "2019-01-13": 0
      });
    });
  });
});

describe('incrementTime', () => {
  beforeEach(() => {
    tk.freeze("Sun Jan 13 2019 20:38:45 GMT+0100 (Central European Standard Time)");
  });

  afterEach(() => {
    tk.reset();
  });

  describe('when chrome.storage has data', () => {
    it('calls callback function with timer data', () => {
      global.chrome = {
        storage: {
          local: {
            get: (key, callback) => {
              callback({
                "youtube_time_tracker_data": {
                  "2019": 100.2,
                  "jan-2019": 100.2,
                  "2-2019": 100.2,
                  "2019-01-13": 100.2
                }
              });
            },
            set: (data, callback) => {
            }
          }
        }
      };

      const callback = jest.fn();

      incrementTime(5, callback);

      expect(callback).toHaveBeenCalledWith({
        "2019": 105.2,
        "jan-2019": 105.2,
        "2-2019": 105.2,
        "2019-01-13": 105.2
      });
    });
  });

  describe('when chrome.storage has no data', () => {
    it('sets todays and this month keys to 0', () => {
      global.chrome = {
        storage: {
          local: {
            get: (key, callback) => {
              callback({
                "youtube_time_tracker_data": null
              });
            },
            set: (data, callback) => {
            }
          }
        }
      };

      const callback = jest.fn();

      incrementTime(5, callback);

      expect(callback).toHaveBeenCalledWith({
        "2019": 5,
        "jan-2019": 5,
        "2-2019": 5,
        "2019-01-13": 5
      });
    });
  });
});


