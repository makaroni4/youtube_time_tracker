const calculateUplift = function(minutesToday, minutesYesterday) {
  return Math.round(100 * (minutesToday - minutesYesterday) / minutesYesterday, 1);
}

export const formatTime = function(minutesToday, minutesYesterday) {
  const hours = Math.floor(minutesToday / 60);
  const min = Math.floor(minutesToday % 60);
  let result = "";
  if(hours) {
    result += hours + "h";
  }

  result += min + "min";

  if(minutesToday >= 10 && minutesYesterday) {
    if(Math.abs(calculateUplift(minutesToday, minutesYesterday)) < 100) {
      const sign = minutesToday > minutesYesterday ? "+" : "";

      result += " " + sign + calculateUplift(minutesToday, minutesYesterday) + "%";
    }
  }

  return result;
}

