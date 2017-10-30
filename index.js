var express = require("express");
var app = express();
var path = require("path");

var port = 5000;
app.set('port', (process.env.PORT || port));
// set up a static server
app.use(express.static("public"));

// set up the views directory
app.set("views", path.join(__dirname,"./views"));
// set up our view engine
app.set("view engine", "ejs");

// set up routes
var routes = require("./app/routes");
app.use("/", routes);

// set up error middleware
app.use(function(req,res){
    res.statusCode = 404;
    res.end("Page doesn't exist");
});

// set up server
app.listen(port, () => {
    console.log("Port is listening on port " + app.get("port"));
});