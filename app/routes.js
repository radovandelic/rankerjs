var express = require("express");
var router = express.Router();
var Image = require("./model");
var bodyParser = require("body-parser");
var db = require("./database");
var logic = require("./logic");

db.startDB();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
    Image.find((err, images) => {
        var message = ""
        if (err) {
            console.log(err);
        } else {
            //res.send(JSON.stringify(images));
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
    var pic = new Image(req.body);
    pic.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
});

router.get("/:id", (req, res) => {
    Image.findById(req.params.id, (err, image) => {
        res.render("image.ejs", { image: image });
    })
});

router.get("/random", (req, res) => {
    Image.find((err, images) => {
        var id = logic.random(images);
        res.redirect("/" + id);
    });
});

module.exports = router;
