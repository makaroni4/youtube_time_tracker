const tk = require('timekeeper');

import { renderTimer } from '../../src/dom';
import { mockChromeStorage } from '../support/mock_chrome_storage';

describe('renderTimer', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="logo"></div>`;

    tk.freeze("Sun Jan 13 2019 20:38:45 GMT+0100 (Central European Standard Time)");
  });

  afterEach(() => {
    tk.reset();
  });

  const trackerData = {
    "2019": 100.2,
    "jan-2019": 100.2,
    "2-2019": 100.2,
    "2019-01-13": 100.2
  };

  describe('when trackerData is passed', () => {
    beforeEach(function() {
      renderTimer(trackerData);
    });

    it('mounts .youtube-time-tracker block', () => {
      expect(document.querySelectorAll('.youtube-time-tracker')).toHaveLength(1);
    });
  });

  describe('when chrome.storage has no data', () => {
    beforeEach(() => {
      mockChromeStorage(trackerData);
    });
  });
});
