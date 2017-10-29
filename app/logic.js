
var logic = {
    random: function (images) {
        var i = 0;
        var idArray = [];
        for (var id in images) {
            idArray.push(images[id]["_id"]);
            i++;
        }
        var index = Math.floor(Math.random() * idArray.length);
        return idArray[index];
    },
    ranking: function (images) {
        var rankedImages = [];
        for (var id in images) {
            rankedImages.push(images[id])
        }
        rankedImages.sort(function (a, b) {
            return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        });
        return rankedImages;
    }
}

module.exports = logic;