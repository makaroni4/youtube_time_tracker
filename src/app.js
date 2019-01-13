import { incrementTime } from './tracker';
import { renderTimer } from './dom';

renderTimer();

setInterval(function() {
  incrementTime(0.1, renderTimer);
}, 6000);
