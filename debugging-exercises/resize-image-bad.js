var request = require('request-promise');
var Promise = require('bluebird');
var fs = require('fs-promise');
var gm = require('gm');
Promise.promisifyAll(gm);

var url = 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png';
var options = { url: url, encoding: null };
request(options)
  .then(function(data) {
    return fs.writeFile('logo.png', data);
  })
  .then(function() {
    return gm('logo.png')
      .resize(240, 240)
      .writeAsync('logo-small.png');
  })
  .then(function() {
    console.log('Done downloading and resizing image.')
  })
  .catch(function(err) {
    console.log(err.message);
  });
