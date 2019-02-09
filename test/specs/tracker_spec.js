const tk = require('timekeeper');

import { readData, incrementTime } from '../../src/js/tracker';
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
      mockChromeStorage({
        "2019": 100.2,
        "jan-2019": 100.2,
        "2-2019": 100.2,
        "2019-01-13": 100.2
      });

      const callback = jest.fn();

      incrementTime(5, callback);

      expect(callback).toHaveBeenCalledWith({
        "2019": 105.2,
        "jan-2019": 105.2,
        "2-2019": 105.2,
        "2019-01-13": 105.2,
        "time_watched": 105.2,
        "installed_at": "2019-01-13"
      });
    });
  });

  describe('when chrome.storage has no data', () => {
    it('sets todays and this month keys to 0', () => {
      mockChromeStorage(null);

      const callback = jest.fn();

      incrementTime(5, callback);

      expect(callback).toHaveBeenCalledWith({
        "2019": 5,
        "jan-2019": 5,
        "2-2019": 5,
        "2019-01-13": 5,
        "time_watched": 5,
        "installed_at": "2019-01-13"
      });
    });
  });
});

describe('cleanUpOldKeys', () => {
  beforeEach(() => {
    tk.freeze("Sun Jan 13 2019 20:38:45 GMT+0100 (Central European Standard Time)");
  });

  afterEach(() => {
    tk.reset();
  });

  it("cleas up keys that won't be used in calculations", () => {
    mockChromeStorage({
      "foo": "bar", // just a random key that should be dropped
      "2017": 1000, // this year won't be used for calculation, so it should be dropped etc
      "2018": 50,
      "dec-2018": 50,
      "52-2018": 50,
      "2018-12-31": 50,
      "2019": 100,
      "jan-2019": 100,
      "2-2019": 100,
      "1-2019": 10,
      "2019-01-13": 100,
      "2019-01-12": 10
    });

    const callback = jest.fn();

    incrementTime(1, callback);

    expect(callback).toHaveBeenCalledWith({
      "2018": 50,
      "2019": 101,
      "dec-2018": 50,
      "jan-2019": 101,
      "2-2019": 101,
      "1-2019": 10,
      "2019-01-13": 101,
      "2019-01-12": 10,
      "installed_at": "2019-01-13",
      "time_watched": 151
    });
  });
});
