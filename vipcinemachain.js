const CrawlE = require("crawl-e/v0.6.5");

let crawlE = new CrawlE({
    cinemas: {
        list:{
            url: "https://vipcinemas.com/vip-db-cinemas",
            box : "#main-navbar > div.fixed.inset-0.z-30 > div.overflow-y-auto.absolute.inset-0.bg-white.rounded-t-2xl > div.py-8 > div > ul > a:nth-child(1)",
            website: "@href"
        },
        details:{
            url: "https://vipcinemas.com:cinema.website:/page/contact",
            name: {
                selector:"head > title",
                mapper: value=> value.split("-")[1].trim()
            },
            address:{
                selector: "body > div > div.w-full.flex-1 > div.mx-auto.px-2.max-w-7xl.grid.grid-cols-12.my-8 > div:nth-child(2) > div > div:nth-child(1) > div.text-xl.text-center.text-gray-800"
            },
            phone: {
                selector: "body > div > div.w-full.flex-1 > div.mx-auto.px-2.max-w-7xl.grid.grid-cols-12.my-8 > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2)",
                mapper: value=> value.split(":")[1].trim()
            }
        }         
    },
    showtimes:{
        url: "https://vipcinemas.com:cinema.website:/?date=:date:",
        urlDateFormat: "YYYY-MM-DD",
        urlDateCount: 10,
        movies: {
            box:"body > div.flex.flex-col.min-h-screen > div.w-full.flex-1 > div:nth-child(4) > div > div.mb-12 > div > div",
            title: {
                selector:"div.p-4.flex-1.flex.flex-col > div.flex-1 > h3 > a",
                attribute: "ownText()"
            },
            showtimes:{ //"div.bg-gray-100.pt-6 > div > h2 > span"
                box: ":box",
                date: {
                    selector:"div.relative.rounded-t-xl.overflow-hidden > a",
                    attribute: "href",
                    mapper: date => date.split("=")[1]
                },
                dateFormat: "YYYY-MM-DD",
                time:{
                    selector: "div.p-4.flex-1.flex.flex-col > div.mt-6.border-t > div.flex.flex-wrap.-ml-4.-mt-4 > div:nth-child(1) > a",
                    mapper: time=> {
                        time= time.trim();
                        if(time.length == 5){
                            time = "0" + time;
                        }
                        return time.replace("a" , "").replace("p", "").trim()
                    }
                }
            }
        }
    }             
});
crawlE.crawl();