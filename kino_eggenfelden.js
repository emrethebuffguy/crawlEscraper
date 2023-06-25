const CrawlE = require("crawl-e/v0.6.5");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Kino Eggenfelden",
      address: "unknown",
      website: "https://www.kino-eggenfelden.de/",
      phone: "08721-2137",
    },
  ],
  showtimes: {
    url: "https://www.kino-eggenfelden.de/kinoprogramm/",
    movies: {
      box: "#elementor-tab-content-1162 > section > div",
      title: {
        selector: "div.movie_detail > h2 > a",
        attributes: "ownText()",
      },

      showtimes: {
        box: ".showstble",
        date: {
          selector: "div > span",
          attributes: "ownText()",
          mapper: (value) => {
            if(value == "Vorstellungen:"){
                return value.replace("Vorstellungen:", "Sonntag, 25.06")
            }

            return value.replace(" :", "")
        },
        },
        dateFormat: "dddd, DD.MM",
        dateLocale: "de",
        time: {
          selector: "a > span",
          attributes: "ownText()",
          mapper: (value) => value.split(" ")[0],
        },
        timeFormat: "HH:mm",
      },
    },
  },
});
crawlE.crawl();
