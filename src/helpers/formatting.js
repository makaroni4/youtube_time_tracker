export const uplift = function(minutesToday, minutesYesterday) {
  if(minutesYesterday === undefined) {
    return;
  }

  const sign = minutesToday > minutesYesterday ? "+" : "";

  return sign + Math.round(100 * (minutesToday - minutesYesterday) / minutesYesterday, 1) + "%";
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
    result += " " + uplift(minutesToday, minutesYesterday);
  }

  return result;
}

