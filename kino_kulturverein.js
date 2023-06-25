const CrawlE = require("crawl-e/v0.6.5");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "KINO KULTURVEREIN",
      address: "Schulgasse 6, 4802 Ebensee",
      website: "https://www.kino-ebensee.at/",
      phone: "0043 6133 6308",
    },
  ],
  showtimes: {
    url: "https://www.kino-ebensee.at/kinoprogramm.html",
    movies: {
      box: ".eventWrap",
      title: ".eventHeader > a",
      showtimes: {
        box: ".spieltermine",
        date: {
          selector: ".single",
          mapper: (value) => value.split(" ")[1],
        },
        dateFormat: "DD.MM.YY",
        datelocale: "de",
        time: {
          selector: ".spieltermine > li:nth-child(1)",
          mapper: value => value.split(" ")[2].trim()
        },
      },
    },
  },
});
crawlE.crawl();
