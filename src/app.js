import { incrementTime } from './tracker';
import { throttle, formatTime } from './helper_functions';
import { showTimer } from './dom';

showTimer();

setInterval(function() {
  incrementTime(0.1, showTimer);
}, 6000);
