export const uplift = (minutesToday, minutesYesterday) => {
  if(minutesYesterday === undefined) {
    return;
  }

  const sign = minutesToday > minutesYesterday ? "+" : "";

  return sign + Math.round(100 * (minutesToday - minutesYesterday) / minutesYesterday, 1) + "%";
}

export const formatTime = (minutesToday = 0) => {
  const hours = Math.floor(minutesToday / 60);
  const min = Math.floor(minutesToday % 60);
  let result = "";

  if(hours) {
    result += hours + "h ";
  }

  result += min + "min";

  return result;
}

