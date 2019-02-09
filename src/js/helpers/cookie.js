export const setCookie = (name, value, days) => {
  let d = new Date;

  d.setTime(d.getTime() + 24 * 60 * 60 * 1000*days);

  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

export const getCookie = (name) => {
  let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

  return v ? v[2] : null;
}
