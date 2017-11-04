var express = require("express");
var app = express();
var path = require("path");
var compress = require('compression');
app.use(compress());

var port = process.env.PORT || 3000;
app.set('port', port);

// set up a static server
app.use(express.static("public"));

// set up the views directory
app.set("views", path.join(__dirname, "../views"));
// set up our view engine
app.set("view engine", "ejs");

// set up routes
var routes = require("./routes");
app.use("/", routes);

// set up error middleware
app.use(function (req, res) {
    res.statusCode = 404;
    res.end("Page doesn't exist");
});

// set up server
app.listen(port, () => {
    console.log("App is listening on port " + port);
});