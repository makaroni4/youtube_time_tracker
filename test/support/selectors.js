const todayStat = () => {
  return Array.from(document.querySelectorAll('.youtube-time-tracker__stats .ytt-stat')).find((el) => {
    return el.textContent.includes("Today:");
  });
}

const weekStat = () => {
  return Array.from(document.querySelectorAll('.youtube-time-tracker__stats .ytt-stat')).find((el) => {
    return el.textContent.includes("This week:");
  });
}

const monthStat = () => {
  return Array.from(document.querySelectorAll('.youtube-time-tracker__stats .ytt-stat')).find((el) => {
    return el.textContent.includes("This month:");
  });
}

const yearStat = () => {
  return Array.from(document.querySelectorAll('.youtube-time-tracker__stats .ytt-stat')).find((el) => {
    return el.textContent.includes("This year:");
  });
}

export const headerTodayTime = () => {
  return document.querySelector('.youtube-time-tracker__time');
}

export const todayTime = () => {
  return todayStat().querySelector(".ytt-stat__time");
}

export const weekTime = () => {
  return weekStat().querySelector(".ytt-stat__time");
}

export const monthTime = () => {
  return monthStat().querySelector(".ytt-stat__time");
}

export const yearTime = () => {
  return yearStat().querySelector(".ytt-stat__time");
}

export const todayUplift = () => {
  return todayStat().querySelector(".ytt-stat__uplift");
}

export const weekUplift = () => {
  return weekStat().querySelector(".ytt-stat__uplift");
}

export const monthUplift = () => {
  return monthStat().querySelector(".ytt-stat__uplift");
}

export const yearUplift = () => {
  return yearStat().querySelector(".ytt-stat__uplift");
}
