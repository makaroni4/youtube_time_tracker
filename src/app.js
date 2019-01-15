import { incrementTime } from './tracker';
import { renderTimer } from './dom';

renderTimer();

const heartbit = 6; // sec

setInterval(function() {
  incrementTime(heartbit / 60, renderTimer);
}, heartbit * 1000);
