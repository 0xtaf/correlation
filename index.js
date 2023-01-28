require("dotenv").config({ path: ".env" });
const { tokens, correlatedPairs } = require("./tokens");
const axios = require("axios");

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.token;

const bot = new TelegramBot(token, { polling: true });

function wait(delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

let url = "https://api.binance.com/api/v3/ticker?&windowSize=1m&symbols=%5B";

tokens.forEach((token, index) => {
  if (index == 0) {
    url = url + "%22" + token + "%22";
  } else {
    url = url + ",%22" + token + "%22";
  }
});

url = url + "%5D";

let result = "";
const fetchAll = () => {
  axios.get(url).then(response => {
    const data = response.data.filter(data => data.priceChangePercent > 2.9);

    data.forEach(data => {
      result =
        result +
        `
${data.symbol}
Artis: %${Number(data.priceChangePercent).toFixed(1)}
Korele pairler: ${correlatedPairs[`${data.symbol}`]}

`;
    });

    if (data.length) {
      bot.sendMessage("-576436107", result);
    }
  });
};

(async () => {
  console.log("started");
  while (true) {
    try {
      fetchAll();
      await wait(11000);
    } catch (error) {
      console.log(error);
    }
  }
})();
