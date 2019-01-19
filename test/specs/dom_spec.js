const tk = require('timekeeper');

import { renderTimer } from '../../src/dom';
import { mockChromeStorage } from '../support/mock_chrome_storage';
import {
  todaysTime,
  todayStat,
  weekStat,
  monthStat,
  yearStat
} from '../support/selectors';

describe('renderTimer', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="logo"></div>`;

    tk.freeze("Sun Jan 13 2019 20:38:45 GMT+0100 (Central European Standard Time)");
  });

  afterEach(() => {
    tk.reset();
  });

  const trackerData = {
    "2019": 110.2,
    "jan-2019": 110.2,
    "2-2019": 110.2,
    "2019-01-13": 110.2
  };

  describe('when chrome.storage has data', () => {
    beforeEach(() => {
      mockChromeStorage({
        "2019-01-13": 100,
        "2019-01-12": 50,
        "2-2019": 100,
        "1-2019": 200,
        "jan-2019": 100,
        // no december data
        "2019": 100,
        "2018": 50,
      });
    });

    describe('when trackerData is passed', () => {
      it('mounts .youtube-time-tracker block', () => {
        renderTimer(trackerData);

        expect(document.querySelectorAll('.youtube-time-tracker')).toHaveLength(1);
      });

      it('displays time from passed data', () => {
        renderTimer(trackerData);

        expect(todaysTime()).toBe("1h 50min");
      });
    });

    describe('when trackerData is not passed', () => {
      describe('when chrome.storage has data for today', () => {
        it('mounts .youtube-time-tracker block', () => {
          renderTimer();

          expect(document.querySelectorAll('.youtube-time-tracker')).toHaveLength(1);
        });

        it('displays time from chrome.storage data', () => {
          renderTimer();

          expect(document.querySelectorAll('.youtube-time-tracker__stats .ytt-stat')).toHaveLength(4);

          expect(todayStat().querySelector(".ytt-stat__time")).toHaveContent("Today: 1h 40min");
          expect(todayStat().querySelector(".ytt-stat__uplift")).toHaveContent("+100%");
          expect(todayStat().querySelector(".ytt-stat__uplift")).toHaveClass("ytt-stat__uplift--active");
          expect(todayStat().querySelector(".ytt-stat__uplift")).toHaveClass("ytt-stat__uplift--red");

          expect(weekStat().querySelector(".ytt-stat__time")).toHaveContent("This week: 1h 40min");
          expect(weekStat().querySelector(".ytt-stat__uplift")).toHaveContent("-50%");
          expect(weekStat().querySelector(".ytt-stat__uplift")).toHaveClass("ytt-stat__uplift--active");
          expect(weekStat().querySelector(".ytt-stat__uplift")).toHaveClass("ytt-stat__uplift--green");

          expect(monthStat().querySelector(".ytt-stat__time")).toHaveContent("This month: 1h 40min");
          expect(monthStat().querySelector(".ytt-stat__uplift")).toHaveContent("");
          expect(monthStat().querySelector(".ytt-stat__uplift")).not.toHaveClass("ytt-stat__uplift--active");

          expect(yearStat().querySelector(".ytt-stat__time")).toHaveContent("This year: 1h 40min");
          expect(yearStat().querySelector(".ytt-stat__uplift")).toHaveContent("+100%");
          expect(yearStat().querySelector(".ytt-stat__uplift")).toHaveClass("ytt-stat__uplift--active");
          expect(yearStat().querySelector(".ytt-stat__uplift")).toHaveClass("ytt-stat__uplift--red");
        });
      });

      describe('when chrome.storage has no data for today', () => {
        it('displays time from chrome.storage data', () => {
          tk.freeze("Sun Jan 14 2019 20:38:45 GMT+0100 (Central European Standard Time)");

          renderTimer();

          expect(document.querySelector('.youtube-time-tracker__time').textContent).toBe("0min");

          tk.reset();
        });
      });
    });
  });

  describe('when chrome.storage has no data', () => {
    beforeEach(() => {
      mockChromeStorage(null);
    });

    describe('when trackerData is passed', () => {
      beforeEach(() => {
        renderTimer(trackerData);
      });

      it('mounts .youtube-time-tracker block', () => {
        expect(document.querySelectorAll('.youtube-time-tracker')).toHaveLength(1);
      });

      it('displays time from passed data', () => {
        expect(document.querySelector('.youtube-time-tracker__time').textContent).toBe("1h 50min");
      });
    });

    describe('when trackerData is not passed', () => {
      beforeEach(() => {
        renderTimer();
      });

      it('mounts .youtube-time-tracker block', () => {
        expect(document.querySelectorAll('.youtube-time-tracker')).toHaveLength(1);
      });

      it('displays 0min', () => {
        expect(document.querySelector('.youtube-time-tracker__time').textContent).toBe("0min");
      });
    });
  });
});
