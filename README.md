# YouTube Time Tracker [![Build Status](https://travis-ci.org/makaroni4/youtube_time_tracker.svg?branch=master)](https://travis-ci.org/makaroni4/youtube_time_tracker)

YouTube Time Tracker is a Chrome Extension that tracks time you spent on YouTube. It's important to notice that it uses only local [chrome.storage API](https://developer.chrome.com/apps/storage) to store data and it __**does't send  data anywhere**__ :warning:.

![frame 3](https://user-images.githubusercontent.com/768070/51078689-c4eae500-16b9-11e9-9c17-1f903e94e284.png)

The data is stored in a simple JSON like this one:

```js
{
  "2019-01-11": 83,
  "2019-01-10": 17,
  ...
}
```

## Development

To run tests use `npm test`.

To develop extension locally use `npm start`.

To build extension before uploading to Chrome Store use `npm build`.
