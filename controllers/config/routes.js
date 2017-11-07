module.exports = function(router) {
    
  //Open: Routes to Home Page
  router.get("/", function(req, res) {
      res.render("index");
  }); //Close: Routes to Home Page
  
  //Open: Routes to Saved Page
  router.get("/saved", function(req, res) {
      res.render("saved");
  }); //Close: Routes to Saved Page

}