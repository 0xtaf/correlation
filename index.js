require("dotenv").config({ path: ".env" });
const axios = require("axios");

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.token;

const bot = new TelegramBot(token, { polling: true });

function wait(delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

const tokens = [
  "HOOKUSDT",
  "MAGICUSDT",
  "HFTUSDT",
  "SANTOSUSDT",
  "LAZIOUSDT",
  "PORTOUSDT",
  "ALPINEUSDT",
  "ATMUSDT",
  "ASRUSDT",
  "ACMUSDT",
  "JUVUSDT",
  "BARUSDT",
  "CITYUSDT",
  "PSGUSDT",
  "OGUSDT",
  "AGIXBUSD",
  "FETBUSD",
  "CTXCBUSD",
  "VOXELUSDT",
  "LOKAUSDT",
  "BONDUSDT",
  "WINGUSDT",
  "SNMBUSD",
  "VIBBUSD",
  "SUNUSDT",
  "JSTUSDT",
  "TLMUSDT",
  "TVKUSDT",
  "AXSUSDT",
  "SLPUSDT",
];

const correlatedPairs = {
  HOOKUSDT: "MAGICUSDT, HFTUSDT",
  MAGICUSDT: "HOOKUSDT, HFTUSDT",
  HFTUSDT: "HOOKUSDT, MAGICUSDT",
  SANTOSUSDT: "LAZIOUSDT PORTOUSDT ALPINEUSDT",
  LAZIOUSDT: "SANTOSUSDT PORTOUSDT ALPINEUSDT",
  PORTOUSDT: "SANTOSUSDT LAZIOUSDT ALPINEUSDT",
  ALPINEUSDT: "SANTOSUSDT LAZIOUSDT PORTOUSDT",
  ATMUSDT: "ASRUSDT ACMUSDT JUVUSDT BARUSDT CITYUSDT PSGUSDT OGUSDT",
  ASRUSDT: "ATMUSDT ACMUSDT JUVUSDT BARUSDT CITYUSDT PSGUSDT OGUSDT",
  ACMUSDT: "ATMUSDT ASRUSDT JUVUSDT BARUSDT CITYUSDT PSGUSDT OGUSDT",
  JUVUSDT: "ATMUSDT ASRUSDT ACMUSDT BARUSDT CITYUSDT PSGUSDT OGUSDT",
  BARUSDT: "ATMUSDT ASRUSDT ACMUSDT JUVUSDT CITYUSDT PSGUSDT OGUSDT",
  CITYUSDT: "ATMUSDT ASRUSDT ACMUSDT JUVUSDT BARUSDT PSGUSDT OGUSDT",
  PSGUSDT: "ATMUSDT ASRUSDT ACMUSDT JUVUSDT BARUSDT CITYUSDT OGUSDT",
  OGUSDT: "ATMUSDT ASRUSDT ACMUSDT JUVUSDT BARUSDT CITYUSDT PSGUSDT",
  AGIXBUSD: "FETBUSD CTXCBUSD",
  FETBUSD: "AGIXBUSD CTXCBUSD",
  CTXCBUSD: "AGIXBUSD FETBUSD",
  VOXELUSDT: "LOKAUSDT",
  LOKAUSDT: "VOXELUSDT",
  BONDUSDT: "WINGUSDT",
  WINGUSDT: "BONDUSDT",
  SNMBUSD: "VIBBUSD",
  VIBBUSD: "SNMBUSD",
  SUNUSDT: "JSTUSDT",
  JSTUSDT: "SUNUSDT",
  TLMUSDT: "TVKUSDT",
  TVKUSDT: "TLMUSDT",
  AXSUSDT: "SLPUSDT",
  SLPUSDT: "AXSUSDT",
  AVAXUSDT: "JOEUSDT",
};

let url = "https://api.binance.com/api/v3/ticker?&windowSize=5m&symbols=%5B";

tokens.forEach((token, index) => {
  if (index == 0) {
    url = url + "%22" + token + "%22";
  } else {
    url = url + ",%22" + token + "%22";
  }
});

url = url + "%5D";

const fetchAll = () => {
  axios.get(url).then(response => {
    const data = response.data.filter(data => data.priceChangePercent > 4);

    const beautified = data.map(data => {
      return {
        symbol: data.symbol,
        change: data.priceChangePercent,
        korelesi: correlatedPairs[`${data.symbol}`],
      };
    });

    if (beautified.length) {
      bot.sendMessage("-576436107", `test: ${JSON.stringify(beautified)}`);
    }
  });
};

(async () => {
  console.log("started");
  while (true) {
    try {
      fetchAll();
      await wait(15000);
    } catch (error) {
      console.log(error);
    }
  }
})();
