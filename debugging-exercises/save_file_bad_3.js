/*
Running this file shows an error, but the error is not catch by the catch block in the promise chain, as is evidenced by the fact that the sentence "Something went wrong" is not displayed.
*/

var request = require('request-promise');
var fs = require('fs');

var amjad = 'https://amasad.me/';
var filename = 'amjad.html';
request.get(amjad)
  .then(function(html) {
    var contents = html.toUpperCase();
    return fs.writeFile('data/amjad.html', contents);
  })
  .then(function() {
    console.log('Wrote file ' + filename);
  })
  .catch(function(err) {
    console.log('Something went wrong');
    console.log(err.message);
  });
