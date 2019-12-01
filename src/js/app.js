import { incrementTime } from './tracker';
import { renderTimer, isPlayingMode } from './dom';

const HEARTBIT = 6; // sec

renderTimer();

setInterval(function() {
  if (isPlayingMode()) incrementTime(HEARTBIT / 60, renderTimer);
}, HEARTBIT * 1000);
