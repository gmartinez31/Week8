var request = require('request-promise');
var Promise = require('bluebird');
var fs = require('fs-promise');
var gm = require('gm');
Promise.promisifyAll(gm.prototype);

gm('js-logo.png')
  .resize(240, 240)
  .writeAsync('js-logo-small.png')
  .then(function() {
    console.log('Created js-logo-small.png')
  })
  .catch(function(err) {
    console.log(err.message);
  });
