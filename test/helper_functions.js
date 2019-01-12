const assert = require('assert');

import { formatTime } from '../src/helper_functions';

describe('formatTime', () => {
  context('when data for yesterday is absent', () => {
    context('when todays time is more than an hour', () => {
      it('shows only number of minutes', () => {
        assert.equal(formatTime(1), "1min");
        assert.equal(formatTime(35.6), "35min");
        assert.equal(formatTime(59), "59min");
      });
    });

    context('when todays time is less than an hour', () => {
      it('shows number of hours and minutes', () => {
        assert.equal(formatTime(61), "1h1min");
        assert.equal(formatTime(95.4), "1h35min");
        assert.equal(formatTime(119), "1h59min");
      });
    });
  });

  context('when data for yesterday is present', () => {
    context('when todays timer is less than 10 minutes', () => {
      it('does not show an uplift', () => {
        assert.equal(formatTime(5, 10), "5min");
      })
    });

    context('when todays timer is more than 10 minutes', () => {
      it('shows an uplift', () => {
        assert.equal(formatTime(15, 30), "15min -50%");
        assert.equal(formatTime(24, 16), "24min +50%");
        assert.equal(formatTime(75, 60), "1h15min +25%");
        assert.equal(formatTime(75, 90), "1h15min -17%");
      })
    });
  });
});


