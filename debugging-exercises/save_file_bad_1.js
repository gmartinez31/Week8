/*

WTF?

Running this script file not only doesn't create the promise.html file it is supposed to, but it prints out this giant blob of HTML.

*/
var request = require('request-promise');
var fs = require('fs-promise');
var url = 'https://en.wikipedia.org/wiki/Futures_and_promises';

request(url)
  .then(function(buffer) {
    var contents = buffer.toString().toUpperCase();
    return contents;
  })
  .then(function(contents) {
    fs.writeFile('promise.html', contents)
    console.log('Wrote file promise.html');
  })
  .catch(function(err) {
    console.log('Something went wrong');
    console.log(err.message);
  });
