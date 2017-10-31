var request = require('request-promise');
var fs = require('fs-promise');


request.get('https://css-tricks.com/')
  .then(function(html) {
    var reversed = html.toString().split('').reverse();
    return fs.writeFile('css-tricks.html', reversed);
  })
  .then(function() {
    console.log('Created css-tricks.html');
  })
  .catch(function(err) {
    console.log('Something went wrong');
    console.log(err.message);
  });
