export const todaysTime = () => {
  return document.querySelector('.youtube-time-tracker__time').textContent.trim();
}

export const todayStat = () => {
  return Array.from(document.querySelectorAll('.youtube-time-tracker__stats .ytt-stat')).find((el) => {
    return el.textContent.includes("Today:");
  });
}

export const weekStat = () => {
  return Array.from(document.querySelectorAll('.youtube-time-tracker__stats .ytt-stat')).find((el) => {
    return el.textContent.includes("This week:");
  });
}

export const monthStat = () => {
  return Array.from(document.querySelectorAll('.youtube-time-tracker__stats .ytt-stat')).find((el) => {
    return el.textContent.includes("This month:");
  });
}

export const yearStat = () => {
  return Array.from(document.querySelectorAll('.youtube-time-tracker__stats .ytt-stat')).find((el) => {
    return el.textContent.includes("This year:");
  });
}
