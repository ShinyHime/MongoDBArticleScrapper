var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// Local Host Port 3000 or Heroku ENV Variable
var PORT = process.env.PORT || 3000;

var app = express();
var router = express.Router();
require("./controllers/config/routes")(router);

app.use(express.static(__dirname + "/public"));

// Initialize Handlebars to Easily Insert Articles from Scrapping and Database
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(router);

// Heroku MonoDB Implementation
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("We are connected!");
  }
});

app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});