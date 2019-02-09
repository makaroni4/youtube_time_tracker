const tk = require('timekeeper');

import {
  todayDate,
  yesterdayDate,
  thisWeek,
  lastWeek,
  thisMonth,
  lastMonth,
  thisYear,
  lastYear
} from '../../../src/js/helpers/date';

beforeEach(() => {
  tk.freeze("Sun Jan 13 2019 20:38:45 GMT+0100 (Central European Standard Time)");
});

afterEach(() => {
  tk.reset();
});

describe('todayDate', () => {
  it("returns today's date in yyyy-mm-dd format", () => {
    expect(todayDate()).toBe("2019-01-13");
  });
});

describe('yesterdayDate', () => {
  it("returns yesterday's date in yyyy-mm-dd format", () => {
    expect(yesterdayDate()).toBe("2019-01-12");
  });
});

describe('thisWeek', () => {
  it("returns week of the year in ww-yyyy format", () => {
    expect(thisWeek()).toBe("2-2019");
  });
});

describe('lastWeek', () => {
  it("returns previous week of the year in ww-yyyy format", () => {
    expect(lastWeek()).toBe("1-2019");
  });

  describe('for the first week of january', () => {
    it('returns last week of december', () => {
      tk.freeze("Sun Jan 2 2019 20:38:45 GMT+0100 (Central European Standard Time)");

      expect(lastWeek()).toBe("52-2018");

      tk.reset();
    });
  });
});

describe('thisMonth', () => {
  it("returns this month in mmm-yyyy format", () => {
    expect(thisMonth()).toBe("jan-2019");
  });
});

describe('lastMonth', () => {
  it("returns previous month in mmm-yyyy format", () => {
    expect(lastMonth()).toBe("dec-2018");
  });
});

describe('thisYear', () => {
  it("returns this year in yyyy format", () => {
    expect(thisYear()).toBe("2019");
  });
});

describe('lastYear', () => {
  it("returns last year in yyyy format", () => {
    expect(lastYear()).toBe("2018");
  });
});
