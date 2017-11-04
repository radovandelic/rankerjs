var express = require("express");
var router = express.Router();
var Image = require("./model");
var bodyParser = require("body-parser");
var mongoose = require("mongoose")

var ImgixClient = require('imgix-core-js');
var apitoken = process.env.apitoken ? process.env.apitoken : require("./keys.js").apitoken;
var client = new ImgixClient({
    host: "rankerjs.imgix.net",
    secureURLToken: apitoken
});

var db = require("./database");
var logic = require("./logic");


db.startDB();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
    Image.find({}, (err, images) => {
        var message = ""
        if (err) {
            console.log(err);
        } else {
            res.render("index.ejs", { db: images });
        }
    })
});

router.get("/add", (req, res) => {
    res.render("add.ejs");
});

router.post("/add", (req, res) => {
    req.body.upvotes = 0;
    req.body.downvotes = 0;
    req.body.thumburl = client.buildURL(req.body.imageurl, { w: 250, h: 250 });
    var pic = new Image(req.body);
    pic.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
});


router.get("/random", (req, res) => {
    Image.find((err, images) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            var id = logic.random(images);
            res.redirect("/" + id);
        }
    });
});

router.get("/ranking", (req, res) => {
    Image.find((err, images) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            var rankedImages = logic.ranking(images);
            res.render("ranking.ejs", { db: rankedImages });
        }
    })
});

router.get("/:id", (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        Image.findById(req.params.id, (err, image) => {
            if (err) {
                console.log(err);
                res.redirect("/");
            } else {
                res.render("image.ejs", { image: image });
            }
        })
    }
});

router.post("/:id", (req, res) => {
    var vote = req.body.vote;
    var id = req.params.id;
    Image.findById(id, (err, image) => {
        if (err) {
            console.log(err);
        } else {
            if (vote == "up") { image.upvotes++; }
            else if (vote = "down") { image.downvotes++; }
            image.save();
        }
        res.redirect("/random");
    })
});

module.exports = router;
