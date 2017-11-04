var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

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
            /*images.forEach(function (image) {
                cloudinary.uploader.upload(image["imageurl"], function (result) {
                    Image.update({ _id: image["_id"] }, { $set: { thumburl: result.url } }, err => {
                        if (err) { console.log(err); }
                    });
                }, { quality: 70, width: 240, crop: "scale" });
            })*/
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
    cloudinary.uploader.upload(req.body.imageurl, function (result) {
        req.body.thumburl = result.url;
        var pic = new Image(req.body);
        pic.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/");
            }
        });

    }, { quality: 70, width: 250, crop: "scale" })
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
