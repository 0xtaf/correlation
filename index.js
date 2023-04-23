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

let url = "https://api.binance.com/api/v3/ticker?&windowSize=3m&symbols=%5B";
let url5m = "https://api.binance.com/api/v3/ticker?&windowSize=5m&symbols=%5B";

tokens.forEach((token, index) => {
  if (index == 0) {
    url = url + "%22" + token + "%22";
    url5m = url5m + "%22" + token + "%22";
  } else {
    url = url + ",%22" + token + "%22";
    url5m = url5m + ",%22" + token + "%22";
  }
});

url = url + "%5D";
url5m = url5m + "%5D";

const emittedPairs = new Map();
const emittedPairs5m = new Map();

const fetchAll = async () => {
  const response = await axios.get(url);

  const data = response.data.filter(data => data.priceChangePercent >= 2);

  if (data.length) {
    let result = "";

    for (const data of allData) {
      const cPairs = correlatedPairs[data.symbol].split(" ");

      for (const pair of cPairs) {
        const url = `https://api.binance.com/api/v3/ticker?&windowSize=3m&symbol=${pair}`;
        const response = await axios.get(url);

        if (response.data.priceChangePercent < 0.6) {
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
        }
      }
    }

    bot.sendMessage("-576436107", result);
  }
};

const fetchSome = async () => {
  const response = await axios.get(url5m);

  const allData = response.data.filter(data => data.priceChangePercent >= 5);

  if (allData.length) {
    let result = "";

    for (const data of allData) {
      const cPairs = correlatedPairs[data.symbol].split(" ");

      for (const pair of cPairs) {
        const url = `https://api.binance.com/api/v3/ticker?&windowSize=5m&symbol=${pair}`;

        const response = await axios.get(url);

        if (response.data.priceChangePercent < 1) {
          if (!emittedPairs5m.has(pair)) {
            emittedPairs5m.set(pair, Date.now());

            result =
              result +
              `
  ${data.symbol}
  5 Dk Artis: %${Number(data.priceChangePercent).toFixed(1)}
  Korelesi: ${pair} %${Number(response.data.priceChangePercent).toFixed(
                1
              )}, Fiyat: ${response.data.lastPrice.replace(/(\.\d*?[1-9])0+$/g, "$1")}

      `;
          }
        }
      }
    }

    if (result != "") {
      bot.sendMessage("-576436107", result);
    }
  }
};

const clearPairs = () => {
  const currentTime = Date.now();

  emittedPairs.forEach((value, key) => {
    if (currentTime - value > 900000) {
      emittedPairs.delete(key);
    }
  });

  emittedPairs5m.forEach((value, key) => {
    if (currentTime - value > 900000) {
      emittedPairs5m.delete(key);
    }
  });
};

(async () => {
  console.log("started");
  while (true) {
    try {
      await fetchAll();
      await wait(5000);
      await fetchSome();
      await wait(11000);
      clearPairs();
    } catch (error) {
      bot.sendMessage("-576436107", "error inside");
    }
  }
})();
