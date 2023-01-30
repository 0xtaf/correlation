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

module.exports = { tokens, correlatedPairs };