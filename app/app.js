var express = require("express");
var app = express();
var path = require("path");

var port = 3000;

// set up a static server
app.use(express.static("public"));

// set up the views directory
<<<<<<< HEAD
app.set("views", path.join(__dirname,"../views/"));
=======
app.set("views", path.join(__dirname,"../views"));
>>>>>>> be613edf321f666b0a8d9dabda15dd59121e2593
// set up our view engine
app.set("view engine", "ejs");

// set up routes
var routes = require("./routes");
app.use("/", routes);

// set up error middleware
app.use(function(req,res){
    res.statusCode = 404;
    res.end("Page doesn't exist");
});

// set up server
app.listen(port, () => {
    console.log("Port is listening on port " + port);
});






