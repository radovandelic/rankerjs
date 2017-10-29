
var logic = {
    random: function (images) {
        var i = 0;
        var imagesCopy = [];
        for (var key in images) {
            imagesCopy.push(images[key]);
            i++;
        }
        var index = Math.floor(Math.random() * imagesCopy.length);
        return imagesCopy[index]["_id"];
    }
}

module.exports = logic;