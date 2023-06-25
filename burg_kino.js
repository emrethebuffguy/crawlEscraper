const CrawlE = require("crawl-e/v0.6.5");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "BURG KINO",
      address: "Burg Kino Opernring 19 1010 Vienna",
      website: "https://www.burgkino.at/",
      phone: "+43 1 587 84 06",
    },
  ],
  showtimes: {
    url: "https://www.burgkino.at/showtimes/:page([today,tomorrow,this-week,next-week]):",
    movies: {
      box: ".views-row",
      title: {
        selector: "div.col-sm-12 > div.field.field--name-node-title.field--type-ds.field--label-hidden.field--item > h2 > a",
        attribute: "ownText()",
      },
      showtimes: {
        box: ".views-element-container",
        dates: {
          selector:"div > div > table > tbody > tr:nth-child(1) > td.views-field.views-field-field-startdatetime > time",
          
        },
        dateFormat: "ddd, DD.MM.YYYY",
        time:{
          selector: "div > div > table > tbody > tr:nth-child(1) > td.views-field.views-field-field-startdatetime-1 > time",
          attribute: "ownText()"
        },
        auditorium: {
          selector: "body > div > div.main-container.container.js-quickedit-main-content > div > section > div > div.views-element-container.form-group > div > div.view-content > div:nth-child(1) > article > div.col-sm-8 > div.views-element-container.form-group > div > div > table > tbody > tr:nth-child(1) > td.views-field.views-field-field-room-name"
        }
      }
      
    },
  },
});

crawlE.crawl();
