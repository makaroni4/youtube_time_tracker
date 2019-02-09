import { incrementTime } from './tracker';
import { renderTimer } from './dom';

const HEARTBIT = 6; // sec

renderTimer();

setInterval(function() {
  incrementTime(HEARTBIT / 60, renderTimer);
}, HEARTBIT * 1000);
