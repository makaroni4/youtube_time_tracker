import { expect } from 'chai';

import { formatTime } from '../../src/helpers/formatting';

describe('formatTime', () => {
  context('when data for yesterday is absent', () => {
    context('when todays time is more than an hour', () => {
      it('shows only number of minutes', () => {
        expect(formatTime(1)).to.equal("1min");
        expect(formatTime(35.6)).to.equal("35min");
        expect(formatTime(59)).to.equal("59min");
      });
    });

    context('when todays time is less than an hour', () => {
      it('shows number of hours and minutes', () => {
        expect(formatTime(61)).to.equal("1h 1min");
        expect(formatTime(95.4)).to.equal("1h 35min");
        expect(formatTime(119)).to.equal("1h 59min");
      });
    });
  });

  context('when data for yesterday is present', () => {
    context('when todays timer is less than 10 minutes', () => {
      it('does not show an uplift', () => {
        expect(formatTime(5, 10)).to.equal("5min");
      })
    });

    context('when todays timer is more than 10 minutes', () => {
      it('shows an uplift', () => {
        expect(formatTime(15, 30)).to.equal("15min -50%");
        expect(formatTime(24, 16)).to.equal("24min +50%");
        expect(formatTime(75, 60)).to.equal("1h 15min +25%");
        expect(formatTime(75, 90)).to.equal("1h 15min -17%");
      })
    });
  });
});


