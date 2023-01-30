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

const emittedPairs = new Map();

const fetchAll = () => {
  axios
    .get(url)
    .then(response => {
      const data = response.data.filter(data => data.priceChangePercent > 2.9);

      if (data.length) {
        let result = "";

        data.forEach(data => {
          if (!emittedPairs.has(data.symbol)) {
            emittedPairs.set(data.symbol, Date.now());

            result =
              result +
              `
${data.symbol}
Artis: %${Number(data.priceChangePercent).toFixed(1)}
Korele pairler: ${correlatedPairs[`${data.symbol}`]}

`;
          }
        });

        bot.sendMessage("-576436107", result);
      }
    })
    .catch(error => {
      bot.sendMessage("-576436107", "error");
    });
};

const clearPairs = () => {
  const currentTime = Date.now();

  emittedPairs.forEach((value, key) => {
    if (currentTime - value > 20000) {
      emittedPairs.delete(key);
    }
  });
};

(async () => {
  console.log("started");
  while (true) {
    try {
      fetchAll();
      await wait(11000);
      clearPairs();
    } catch (error) {
      bot.sendMessage("-576436107", "error inside");
    }
  }
})();
