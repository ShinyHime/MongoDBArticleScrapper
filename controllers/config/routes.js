var Note = require('../../models/note');
var Article = require('../../models/article');
var cheerio = require("cheerio");
var request = require("request");

module.exports = function(router) {
    
    //Open: Routes to Home Page
    router.get("/", function(req, res) {
        var articles = Article.find({}, function (err, doc) {
            
                res.render('index', {
                  doc: doc
                });
            
              })
    }); //Close: Routes to Home Page
  
    //Open: Routes to Saved Page
    router.get("/saved", function(req, res) {
        res.render("saved");
    }); //Close: Routes to Saved Page


    router.get('/api/scrape', function (err, res) {

        // NYT Web Page to Scrape
        var todaysPaper = "http://www.nytimes.com/pages/todayspaper/index.html?action=Click&module=HPMiniNav&region=TopBar&WT.nav=page&contentCollection=TodaysPaper&pgtype=Homepage";

        // Open: Cheerio Request
        request(todaysPaper, function (error, response, html) {
        
            var $ = cheerio.load(html);
            
            // Open: Getting Information from the story class
            $('.story').each(function (i, element) {
        
                var result = {};
            
                result.headline = $(this).children('h3').text();
                result.summary = $(this).children('p').text();
                result.link = $(this).find('a').attr('href');
                
                var entry = new Article(result);
                
                entry.save(function (err, doc) {
                    console.log(doc)
                })
            }); // Close: Getting Information from the story class
        }); // Close: Cheerio Request

        // Open: Finds All Saved articles and redirects the page
        Article.find({}, function (err, doc) {
            if (err) {
              console.log(err);
            }
            else {
              res.redirect("/");
            }
        });// Close: Finds All Saved articles and redirects the page
    });

    // Open: Finds All Saved articles and redirects the page
    router.get('/articles', function (req, res) {
        Article.find({}, function (err, doc) {
          if (err) {
            console.log(err);
          }
          else {
            res.json(doc);
          }
        });
    }); // Close: Finds All Saved articles and redirects the page
    
    // For Deleting information from DB
    router.get('/delete', function (req, res) {

    });
        

}