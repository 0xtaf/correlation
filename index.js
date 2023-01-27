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
};

const urls = [
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=HOOKUSDT",
  "https://api.binance.com/api/v3/ticker?&windowSize=5m&symbol=MAGICUSDT",
  "https://api.binance.com/api/v3/ticker?&windowSize=5m&symbol=HFTUSDT",
  "https://api.binance.com/api/v3/ticker?&windowSize=5m&symbol=SANTOSUSDT",
  "https://api.binance.com/api/v3/ticker?&windowSize=5m&symbol=LAZIOUSDT",
  "https://api.binance.com/api/v3/ticker?&windowSize=5m&symbol=PORTOUSDT",
  "https://api.binance.com/api/v3/ticker?&windowSize=5m&symbol=ALPINEUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=ATMUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=ASRUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=ACMUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=JUVUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=BARUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=CITYUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=PSGUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=OGUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=AGIXBUSD",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=FETBUSD",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=CTXCBUSD",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=VOXELUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=LOKAUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=BONDUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=WINGUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=SNMBUSD",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=VIBBUSD",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=SUNUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=JSTUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=TLMUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=TVKUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=AXSUSDT",
  "https://api.binance.com/api/v3/ticker?windowSize=5m&symbol=SLPUSDT",
];

const fetchPrices = async () => {
  await Promise.all([
    axios.get(urls[0]),
    axios.get(urls[1]),
    axios.get(urls[2]),
    axios.get(urls[3]),
    axios.get(urls[4]),
    axios.get(urls[5]),
    axios.get(urls[6]),
    axios.get(urls[7]),
    axios.get(urls[8]),
    axios.get(urls[9]),
    axios.get(urls[10]),
    axios.get(urls[11]),
    axios.get(urls[12]),
    axios.get(urls[13]),
    axios.get(urls[14]),
    axios.get(urls[15]),
    axios.get(urls[16]),
    axios.get(urls[17]),
    axios.get(urls[18]),
    axios.get(urls[19]),
    axios.get(urls[20]),
    axios.get(urls[21]),
    axios.get(urls[22]),
    axios.get(urls[23]),
    axios.get(urls[24]),
    axios.get(urls[25]),
    axios.get(urls[26]),
    axios.get(urls[27]),
    axios.get(urls[28]),
    axios.get(urls[29]),
  ])
    .then(response => {
      response.forEach(resp => {
        // console.log(resp.data.symbol, resp.data.priceChangePercent);
        if (resp.data.priceChangePercent > 5) {
          bot.sendMessage(
            "-576436107",
            `${resp.data.symbol}: change: %${
              resp.data.priceChangePercent
            } korele pairleri: ${correlatedPairs[`${resp.data.symbol}`]}`
          );
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

(async () => {
  console.log("started");
  while (true) {
    await fetchPrices();
    await wait(15000);
  }
})();
