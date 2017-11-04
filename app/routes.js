var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");


var ImgixClient = require('imgix-core-js');
var client = new ImgixClient({
    host: "rankerjs.imgix.net",
    secureURLToken: process.env.apitoken || require("./keys").apitoken
});

var cloudinary = require('cloudinary');
var cloudinary_config = process.env.cloud_name ? {
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
} : require("./keys").cloudinary_config;
cloudinary.config(cloudinary_config);

var db = require("./database");
var Image = require("./model");
var logic = require("./logic");
db.startDB();

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
    Image.find({}, (err, images) => {
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

    //resizes and compresses image
    var url = client.buildURL(req.body.imageurl, { w: 300, fm: "jpg", auto: "compress" });

    cloudinary.uploader.upload(url, function (result) {

        //sets image url to cloudinary cdn
        req.body.thumburl = result.url;

        //sets image to imgix cdn
        req.body.thumburl = "http://rankerimg.imgix.net" + req.body.thumburl.substring(req.body.thumburl.lastIndexOf("/"), req.body.thumburl.length);

        //saves image data to db
        var pic = new Image(req.body);
        pic.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/");
            }
        });
    })
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
