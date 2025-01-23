const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(bodyParser.json());

app.post('/place_request', (req, res) => {
  const { name, email, request } = req.body;

  const message = `👤 *Name:* ${name}\n📧 *Email:* ${email}\n💬 *Request:* ${request}`;

  axios
    .post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    })
    .then(() => {
      res.status(200).send({ status: 'success' });
    })
    .catch(error => {
      res.status(500).send({ status: 'error', message: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
