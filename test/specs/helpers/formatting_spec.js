import { uplift, formatTime } from '../../../src/js/helpers/formatting';

describe('formatTime', () => {
  describe('when todays time is less than an hour', () => {
    it('returns only number of minutes', () => {
      expect(formatTime(1)).toBe("1min");
      expect(formatTime(35.6)).toBe("35min");
      expect(formatTime(59)).toBe("59min");
    });
  });

  describe('when todays time is more than an hour', () => {
    it('returns number of hours and minutes', () => {
      expect(formatTime(61)).toBe("1h 1min");
      expect(formatTime(95.4)).toBe("1h 35min");
      expect(formatTime(119)).toBe("1h 59min");
    });
  });

  describe('when no input is passed', () => {
    it('returns 0min', () => {
      expect(formatTime()).toBe("0min");
    });
  });
});

describe('uplift', () => {
  describe('when no input is passed', () => {
    it('returns undefined', () => {
      expect(uplift()).toBe(undefined);
    });
  });

  describe('when there is only curren time present', () => {
    it("always returns undefined", () => {
      expect(uplift(0)).toBe(undefined);
      expect(uplift(100)).toBe(undefined);
    })
  });

  describe('when there are both params present: current and prev times', () => {
    it("returns relative uplift with sign and percentage symbol", () => {
      expect(uplift(0, 100)).toBe(undefined);
      expect(uplift(1, 100)).toBe("-99%");
      expect(uplift(200, 100)).toBe("+100%");
      expect(uplift(30, 45)).toBe("-33%");
    })
  });
});
