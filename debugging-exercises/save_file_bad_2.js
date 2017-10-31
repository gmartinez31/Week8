/*

Running this file reports that it saves the file, when in reality it does not.

*/

var request = require('request-promise');
var fs = require('fs-promise');

var url = 'https://davidwalsh.name/'
request(url)
  .then(function(url) {
    fs.writeFile('davidwalsh.html', url);
    return;
  })
  .then(function () {
    console.log('Wrote file davidwalsh.html');
  })
  .catch(function(err) {
    console.log('Something went wrong');
    console.log(err.message);
  });

// 