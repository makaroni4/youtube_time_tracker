import { readData, persistData, incrementTime } from './tracker';
import { throttle, calculateUplift, formatTime } from './helper_functions';

const showTimer = function() {
  let logo = document.getElementById("logo");

  if(logo) {
    let timer = document.getElementById("youtube-time-tracker-timer");

    if(!timer) {
      timer = document.createElement("div");
      timer.id = "youtube-time-tracker-timer";
      timer.className = "youtube-time-tracker";

      logo.parentNode.insertBefore(timer, logo.nextSibling);
    }

    const timerData = readData();

    if(timerData) {
      let today = new Date().toISOString().slice(0, 10);
      var date = new Date();
      date.setDate(date.getDate() - 1);

      let yesterday = date.toISOString().slice(0, 10);

      timer.innerHTML = formatTime(timerData[today], timerData[yesterday]);
    }
  }
}

var observeDOM = (function() {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var eventListenerSupported = window.addEventListener;

  return function(obj, callback) {
    if(MutationObserver) {
      var obs = new MutationObserver(function(mutations, observer) {
        if(mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
          callback();
        }
      });

      obs.observe(obj, {
        childList:true,
        subtree:true
      });
    } else if(eventListenerSupported) {
      obj.addEventListener("DOMNodeInserted", callback, false);
      obj.addEventListener("DOMNodeRemoved", callback, false);
    }
  };
})();

showTimer();

setInterval(incrementTime, 60000);

observeDOM(document.body, function() {
  throttle(showTimer, 1000);
});

