import { incrementTime } from './tracker';
import { renderTimer } from './dom';

const heartbit = 6; // sec
let heartbitsCount = 0;

renderTimer();

setInterval(function() {
  if(heartbitsCount % 10 === 0) {
    incrementTime(heartbit / 60, renderTimer);
  } else {
    incrementTime(heartbit / 60);
  }

  heartbitsCount += 1;
}, heartbit * 1000);
