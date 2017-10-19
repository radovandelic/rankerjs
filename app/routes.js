var express = require("express");
var router = express.Router();
var model = require("./model");
var bodyParser = require("body-parser");
var db = require("./database");

db.startDB();

