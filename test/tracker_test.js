const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
const tk = require('timekeeper');

chai.use(spies);

import { readData } from '../src/tracker';

describe('readData', () => {
  beforeEach(() => {
    tk.freeze("Sun Jan 13 2019 20:38:45 GMT+0100 (Central European Standard Time)");
  });

  afterEach(() => {
    tk.reset();
  });

  context('when chrome.storage has data', () => {
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
            }
          }
        }
      };

      const callback = function(data) {};
      const spy = chai.spy(callback);

      readData(spy);

      expect(spy).to.have.been.called.with({
        "2019": 100.2,
        "jan-2019": 100.2,
        "2-2019": 100.2,
        "2019-01-13": 100.2
      });
    });
  });

  context('when chrome.storage has no data', () => {
    it('sets todays and this month keys to 0', () => {
      global.chrome = {
        storage: {
          local: {
            get: (key, callback) => {
              callback({
                "youtube_time_tracker_data": null
              });
            }
          }
        }
      };

      const callback = function(data) {};
      const spy = chai.spy(callback);

      readData(spy);

      expect(spy).to.have.been.called.with({
        "2019": 0,
        "jan-2019": 0,
        "2-2019": 0,
        "2019-01-13": 0
      });
    });
  });
});
