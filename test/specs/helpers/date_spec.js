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
} from '../../../src/helpers/date';

describe('todayDate', () => {
  beforeEach(() => {
    tk.freeze("Sun Jan 13 2019 20:38:45 GMT+0100 (Central European Standard Time)");
  });

  afterEach(() => {
    tk.reset();
  });

  it("returns today's date in yyyy-mm-dd format", () => {
    expect(todayDate()).toBe("2019-01-13")
  });
});

describe('yesterdayDate', () => {
  beforeEach(() => {
    tk.freeze("Sun Jan 13 2019 20:38:45 GMT+0100 (Central European Standard Time)");
  });

  afterEach(() => {
    tk.reset();
  });

  it("returns yesterday's date in yyyy-mm-dd format", () => {
    expect(yesterdayDate()).toBe("2019-01-12")
  });
});

describe('thisWeek', () => {

});

describe('lastWeek', () => {

});

describe('thisMonth', () => {

});

describe('lastMonth', () => {

});

describe('thisYear', () => {

});

describe('lastYear', () => {

});
