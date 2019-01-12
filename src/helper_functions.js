const calculateUplift = function(minutesToday, minutesYesterday) {
  return Math.round(100 * (minutesToday - minutesYesterday) / minutesToday, 1);
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
    if(Math.abs(calculateUplift(minutesToday, minutesYesterday)) < 100) {
      var sign = minutesToday > minutesYesterday ? "+" : "";

      result += " " + sign + calculateUplift(minutesToday, minutesYesterday) + "%";
    }
  }

  return result;
}

export const todayDate = function() {
  return new Date().toISOString().slice(0, 10);
}

export const yesterdayDate = function() {
  let date = new Date();

  date.setDate(date.getDate() - 1);

  return date.toISOString().slice(0, 10);
}
