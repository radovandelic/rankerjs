var mongoose = require("mongoose");

var schema = mongoose.Schema({
    imageurl: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true
    },
    downvotes: {
        type: Number,
        required: true
    },
    thumburl: {
        type: String,
        required: false
    }
})

var Image = mongoose.model("Image", schema); //it creates a model based on my schema (similar to data model project)
module.exports = Image;