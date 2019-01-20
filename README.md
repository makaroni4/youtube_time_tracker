# YouTube™ Time Tracker [![Build Status](https://travis-ci.org/makaroni4/youtube_time_tracker.svg?branch=master)](https://travis-ci.org/makaroni4/youtube_time_tracker)

YouTube™ Time Tracker is a Chrome Extension that tracks time you spent on YouTube. It's important to notice that it uses only local [chrome.storage API](https://developer.chrome.com/apps/storage) to store data and it __**does't send  data anywhere**__ :warning:.

![YouTube™ Time Tracker screenshots](https://user-images.githubusercontent.com/768070/51443822-ed449600-1cee-11e9-90d9-40a597ef512a.jpg)

## Stored data format

Although local chrome.storage allows us to store [up to 5 Mb of data](https://developer.chrome.com/apps/storage#property-local) extension keeps its data very simple, just JSON with 8 keys for current/previous time periods:

```js
{
  "2019": 110.2, // year
  "jan-2019": 110.2, // month
  "2-2019": 110.2, // week (0-52)
  "2019-01-13": 110.2, // today
  "2018": 10294, // previous year
  "dec-2018": 1248, // previous month
  "1-2019": 159, // previous week
  "2019-01-12": 91 // yesterday
}
```

## Development

Use `npm install` to install needed packages (there are just a bunch: webpack, babel, jest and timekeeer for testing).

Then run `npm start` for Webpack to watch and compile JS files.

Load [extension folder](https://github.com/makaroni4/youtube_time_tracker/tree/master/extension) to [chrome://extensions/](chrome://extensions/) via "Load unpacked":

![Loading extension in Chrome for development](https://user-images.githubusercontent.com/768070/51443928-e3bc2d80-1cf0-11e9-9389-08887d88015f.png).

:warning: You'll need to update extension every time you changed CSS/JS files. :warning: Webpack will watch JS files and compile app.js file in `extension` folder.

## Testing

To run tests use `npm test`.

Tests are written with [jest](https://jestjs.io/) with [a bunch of custom matchers](https://github.com/makaroni4/youtube_time_tracker/tree/master/test/custom_matchers) and [custom helper functions](https://github.com/makaroni4/youtube_time_tracker/tree/master/test/support).
