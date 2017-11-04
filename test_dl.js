const fs = require('file-system');
const download = require('download');

download('http://webshop.viva-iberica.com/ekmps/shops/rlust/images/donkey-wooden-saddle-pack-and-donkey-harness-1116-p.jpg').then(data => {
    fs.writeFileSync('public/images/foo.jpg', data);
});
/*
Promise.all([
    'unicorn.com/foo.jpg',
    'cats.com/dancing.gif'
].map(x => download(x, 'dist'))).then(() => {
    console.log('files downloaded!');
});*/