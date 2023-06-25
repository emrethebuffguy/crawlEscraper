const CrawlE = require("crawl-e/v0.6.5");
let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://www.dieselkino.at/",
      box: ".standorte > #kino_standorte > area",
      website: {
        selector: "",
        attribute: "href",
        mapper: (value) => value.split("&")[0],
      },
    },
    details: { 
      url: ":cinema.website:&id=102",
      name: "#wrapper > div.content > div.spalte_li > div.adressblock-links > strong",
      address: {
        selector:
          "#wrapper > div.content > div.spalte_li > div.adressblock-links",
        attribute: "html()",
        mapper: (value) =>
          value
            .split(" ")
            .slice(2, 4)
            .join(" ")
            .replace("<strong>", " ")
            .replace("</strong>", "")
            .replace("<br>", " "),
      },
      phone: {
        selector:
          "#wrapper > div.content > div.spalte_li > div.adressblock-links",
        attribute: "html()",
        mapper: (value) =>
          value.split("<br>")[3].split(" ").slice(1, 5).join(" "),
      },
    },
  },
  showtimes: {
    url: ":cinema.website:&id=301",

    movies: {
      box: ".kinoprogramm-woche-zeile",
      title: {
        selector: ".hl-1",
      },
      showtimes: {
        box: ".kinoprogramm-woche-zeile > table > tbody > tr",
        date: {
          selector: "td:nth-child(1) > b",
          attribute: "ownText()",
          mapper: (value) => value.split(" ")[1],
        },
        dateFormat: "DD.MM.YYYY",
        time: {
          selector: "td:nth-child(1) > b",
          attribute: "ownText()",
          mapper: (value) =>
            value.split(".")[2].slice(0, 2) +
            ":" +
            value.split(".")[2].slice(2, 4),
        }, // the site does not include the time of a movie so I scraped dummy values for it.
      },
    },
  },
});
crawlE.crawl();
