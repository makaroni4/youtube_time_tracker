import { formatTime } from '../../src/helpers/formatting';

describe('formatTime', () => {
  describe('when data for yesterday is absent', () => {
    describe('when todays time is more than an hour', () => {
      it('shows only number of minutes', () => {
        expect(formatTime(1)).toBe("1min");
        expect(formatTime(35.6)).toBe("35min");
        expect(formatTime(59)).toBe("59min");
      });
    });

    describe('when todays time is less than an hour', () => {
      it('shows number of hours and minutes', () => {
        expect(formatTime(61)).toBe("1h 1min");
        expect(formatTime(95.4)).toBe("1h 35min");
        expect(formatTime(119)).toBe("1h 59min");
      });
    });
  });

  describe('when data for yesterday is present', () => {
    describe('when todays timer is less than 10 minutes', () => {
      it('does not show an uplift', () => {
        expect(formatTime(5, 10)).toBe("5min");
      })
    });

    describe('when todays timer is more than 10 minutes', () => {
      it('shows an uplift', () => {
        expect(formatTime(15, 30)).toBe("15min -50%");
        expect(formatTime(24, 16)).toBe("24min +50%");
        expect(formatTime(75, 60)).toBe("1h 15min +25%");
        expect(formatTime(75, 90)).toBe("1h 15min -17%");
      })
    });
  });
});


