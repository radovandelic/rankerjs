var express = require("express");
var router = express.Router();
var Image = require("./model");
var bodyParser = require("body-parser");
var db = require("./database");

db.startDB();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
    Image.find((err, images) => {
        var message = ""
        if (err) {
            console.log(err);
<<<<<<< HEAD
        } else {
            res.render("index", { db: images });
=======
        } else {            
            //res.send(JSON.stringify(images));
            res.render("index.ejs", { db: images });
>>>>>>> be613edf321f666b0a8d9dabda15dd59121e2593
        }
    })
});

router.get("/add", (req, res) => {
    res.render("add.ejs");
});

router.post("/add", (req, res) => {
    req.body.upvotes = 0;
    req.body.downvotes = 0;
    var pic = new Image(req.body);
    pic.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;
