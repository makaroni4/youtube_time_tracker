/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incrementTime = exports.readData = undefined;

var _helper_functions = __webpack_require__(1);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TRACKER_STORAGE_KEY = "youtube_time_tracker_data";

var persistData = function persistData(timer) {
  chrome.storage.local.set(_defineProperty({}, TRACKER_STORAGE_KEY, timer), function () {
    console.log('Youtube Time Tracker is set to:');
    console.dir(timer);
  });
};

var readData = exports.readData = function readData(callback) {
  chrome.storage.local.get([TRACKER_STORAGE_KEY], function (result) {
    console.log('Youtube Time Tracker read as:');
    console.dir(result);

    var timer = result[TRACKER_STORAGE_KEY];

    if (timer) {
      callback(timer);
    } else {
      var _result = {};

      _result[(0, _helper_functions.todayDate)()] = 0;
      _result[(0, _helper_functions.thisMonth)()] = 0;

      callback(_result);
    }
  });
};

var incrementTime = exports.incrementTime = function incrementTime(increment, callback) {
  if (document.visibilityState === "hidden") {
    return;
  }

  readData(function (timer) {
    var today = (0, _helper_functions.todayDate)();
    var month = (0, _helper_functions.thisMonth)();

    if (timer[today]) {
      timer[today] += increment;
    } else {
      timer[today] = increment;
    }

    if (timer[month]) {
      timer[month] += increment;
    } else {
      timer[month] = increment;
    }

    persistData(timer);

    if (callback) {
      callback(timer);
    }
  });
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var calculateUplift = function calculateUplift(minutesToday, minutesYesterday) {
  return Math.round(100 * (minutesToday - minutesYesterday) / minutesYesterday, 1);
};

var formatTime = exports.formatTime = function formatTime(minutesToday, minutesYesterday) {
  var hours = Math.floor(minutesToday / 60);
  var min = Math.floor(minutesToday % 60);
  var result = "";
  if (hours) {
    result += hours + "h";
  }

  result += min + "min";

  if (minutesToday >= 10 && minutesYesterday) {
    if (Math.abs(calculateUplift(minutesToday, minutesYesterday)) < 100) {
      var sign = minutesToday > minutesYesterday ? "+" : "";

      result += " " + sign + calculateUplift(minutesToday, minutesYesterday) + "%";
    }
  }

  return result;
};

var todayDate = exports.todayDate = function todayDate() {
  return new Date().toISOString().slice(0, 10);
};

var yesterdayDate = exports.yesterdayDate = function yesterdayDate() {
  var date = new Date();

  date.setDate(date.getDate() - 1);

  return date.toISOString().slice(0, 10);
};

var thisMonth = exports.thisMonth = function thisMonth() {
  var date = new Date();

  return date.getMonth() + '-' + date.getFullYear();
};

var lastMonth = exports.lastMonth = function lastMonth() {
  var date = new Date();

  date.setMonth(date.getMonth() - 1);

  return date.getMonth() + '-' + date.getFullYear();
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tracker = __webpack_require__(0);

var _dom = __webpack_require__(3);

(0, _dom.renderTimer)();

setInterval(function () {
  (0, _tracker.incrementTime)(0.1, _dom.renderTimer);
}, 6000);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTimer = undefined;

var _helper_functions = __webpack_require__(1);

var _tracker = __webpack_require__(0);

var timerBlock = function timerBlock() {
  var logo = document.getElementById("logo");
  var timer = document.getElementById("youtube-time-tracker");

  if (!timer) {
    timer = document.createElement("div");

    timer.innerHTML = '\n      <div class="youtube-time-tracker__body">\n        <div class="youtube-time-tracker__stopwatch-icon">\n        </div>\n\n        <div class="youtube-time-tracker__time">\n        </div>\n\n        <div class="youtube-time-tracker__stats">\n        </div>\n      </div>\n    '.trim();

    timer.id = "youtube-time-tracker";
    timer.className = "youtube-time-tracker";

    logo.parentNode.insertBefore(timer, logo.nextSibling);
  }

  return timer;
};

var renderTimer = exports.renderTimer = function renderTimer(timerData) {
  var logo = document.getElementById("logo");

  if (logo) {
    var timer = timerBlock();
    var timeBlock = timer.querySelector(".youtube-time-tracker__time");
    var statsBlock = timer.querySelector(".youtube-time-tracker__stats");

    var today = (0, _helper_functions.todayDate)();
    var yesterday = (0, _helper_functions.yesterdayDate)();
    var month = (0, _helper_functions.thisMonth)();
    var prevMonth = (0, _helper_functions.thisMonth)();

    if (timerData) {
      timeBlock.innerHTML = (0, _helper_functions.formatTime)(timerData[today], timerData[yesterday]);
      statsBlock.innerHTML = "This month: " + (0, _helper_functions.formatTime)(timerData[month]);
    } else {
      (0, _tracker.readData)(function (timerData) {
        timeBlock.innerHTML = (0, _helper_functions.formatTime)(timerData[today], timerData[yesterday]);
        statsBlock.innerHTML = "This month: " + (0, _helper_functions.formatTime)(timerData[month]);
      });
    }
  }
};

/***/ })
/******/ ]);