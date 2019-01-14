export const todayDate = function() {
  return new Date().toISOString().slice(0, 10);
}

export const yesterdayDate = function() {
  let date = new Date();

  date.setDate(date.getDate() - 1);

  return date.toISOString().slice(0, 10);
}

// https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php/6117889#6117889
const datesWeek = function(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);

  return weekNo;
}

export const thisWeek = function() {
  let date = new Date();

  return datesWeek(date) + '-' + date.getFullYear();
};

export const lastWeek = function() {
  let date = new Date();

  date.setDate(date.getDate() - 7);

  return datesWeek(date) + '-' + date.getFullYear();
}

const monthNames = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec"
];

export const thisMonth = function() {
  const date = new Date();

  return monthNames[date.getMonth()] + '-' + date.getFullYear();
}

export const lastMonth = function() {
  const date = new Date();

  date.setMonth(date.getMonth() - 1);

  return date.getMonth() + '-' + date.getFullYear();
}

export const thisYear = function() {
  const date = new Date();

  return date.getFullYear();
}

export const lastYear = function() {
  const date = new Date();

  date.setDate(date.getDate() - 365);

  return date.getFullYear();
}
