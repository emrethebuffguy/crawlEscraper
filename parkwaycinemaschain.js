const CrawlE = require("crawl-e/v0.6.5");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://parkwaycinemas.co.uk/", 
      box: "#form1 > section > ul > li", //
      website: {
        selector: "button > strong",
        attribute: "ownText()",
        mapper: (value) => {
            if(value === "Barnsley"){
                return ""
            }
            else {
                return value
            }
        }
      },
    },
    details: {
      url: "https://:cinema.website:.parkwaycinemas.co.uk",
      name: {
        selector: "#bodyElement > footer > div > div.inner > div > p > strong",
        mapper: (value) => value.split("+")[1],
      },
      address: {
        selector: "#bodyElement > footer > div > div.inner > div > p > em",
        attribute: "html()",
        mapper: (address) => address.split("<br>")[0].replace("<em>", ""),
      },
      phone: {
        selector: "#bodyElement > footer > div > div.inner > div > p > em > a",
        attribute: "ownText()",
      },
    },
  },
  showtimes: {
    url: "https://:cinema.website:.parkwaycinemas.co.uk/film/",
    movies: {
      box: ".guideFilm",
      title: {
        selector: ".pd > .pdi > h2 > a",
        attribute: "href",
        mapper: (value) => value.replace("/", "").replaceAll("-", " "),
      },
      showtimes: {
        box: ".schedule",
        date: {
            selector:"table > tbody > tr > td:nth-child(1) > h5",
            mapper: (value)=>{
                const currentYear = new Date().getFullYear();
                const formattedDateString = `${value} ${currentYear}`;
                const date = new Date(formattedDateString);
                const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
                return formattedDate
            }
        },
        dateFormat: "MM-DD-YYYY",
        time:{
            selector:"table > tbody > tr:nth-child(1) > td:nth-child(2) > div > dl > dd > a:nth-child(1)",
            mapper: value=> {
                value = value.replace(".", ":").replace(/\D/g,'')
                value = value.slice(0,2) + ":" + value.slice(2,4);
                if ( value == null){
                    return 
                }
                return value
            }
        } // I could not figure out how to iterate over a time array with strings so that It writes the movies with different
      }   // showtimes as seperate objects in the output. So I only took the first date's first hour. The code requires a minor
    },    // change to work properly and save the movies with all of the time strings.
  },
});
crawlE.crawl();
