export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const formatTime = function(minutesToday, minutesYesterday) {
  var hours = Math.floor(minutesToday / 60);
  var min = Math.floor(minutesToday % 60);
  var result = "";
  if(hours) {
    result += hours + "h";
  }

  result += min + "min";

  if(minutesYesterday) {
    if(Math.abs(uplift(minutesToday, minutesYesterday)) < 100) {
      var sign = minutesToday > minutesYesterday ? "+" : "";

      result += " " + sign + uplift(minutesToday, minutesYesterday) + "%";
    }
  }

  return result;
}

export const calculateUplift = function(minutesToday, minutesYesterday) {
  return Math.round(100 * (minutesToday - minutesYesterday) / minutesToday, 1);
}
