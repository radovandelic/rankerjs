/*const fs = require('file-system');
const download = require('download');

download('http://webshop.viva-iberica.com/ekmps/shops/rlust/images/donkey-wooden-saddle-pack-and-donkey-harness-1116-p.jpg').then(data => {
    fs.writeFileSync('public/images/foo.jpg', data);
});

Promise.all([
    'unicorn.com/foo.jpg',
    'cats.com/dancing.gif'
].map(x => download(x, 'dist'))).then(() => {
    console.log('files downloaded!');
});*/

/*var imgur = require('imgur-node-api');
imgur.setClientID("876d1603139f1f1");

imgur.upload(`https://rankerjs.imgix.net/https%3A%2F%2Fassets.wired.com%2Fphotos%2Fw_2338%2Fwp-content%2Fuploads%2F2016%2F07%2FSpiderFerrari1.jpg?w=250&h=250&ixlib=js-1.1.1&s=a8b89b29fb068a3c3bd51338fd88bcfb`, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res.data.link);
    }
});*/

var cloudinary = require('cloudinary');
var key = require("./app/keys.js")
cloudinary.config(keys.cloudinary_config);

cloudinary.uploader.upload("http://webshop.viva-iberica.com/ekmps/shops/rlust/images/donkey-wooden-saddle-pack-and-donkey-harness-1116-p.jpg", function (result) {
    console.log(result.url);
}, { width: 250, height: 250, crop: "limit" });