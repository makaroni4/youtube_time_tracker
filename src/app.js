import { incrementTime } from './tracker';
import { showTimer } from './dom';

showTimer();

setInterval(function() {
  incrementTime(0.1, showTimer);
}, 6000);
