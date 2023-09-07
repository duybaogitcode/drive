const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

var CronJob = require('cron').CronJob;
var job = new CronJob(
  '*/1 * * * *', // Chạy mỗi 10 phút
  async function () {
    try {
      const response = await axios.get('https://api.fxchange.me/', {
        timeout: 15000, // Thời gian chờ (milliseconds)
      });

      console.log('Awake server');
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        console.error('Server awake request timed out');
      } else {
        console.error('Error sending server awake request');
      }
    }
  },
  null,
  true,
  'America/Los_Angeles'
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
