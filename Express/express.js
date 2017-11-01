////////////////////////////////////////// EXPRESS EXERCISES /////////////////////////////////////////////////////////
/////////////////////// Hello World ///////////////////////////////////////////////
var express = require('express');
// app.use('/static', express.static('public'));
// app.set('view engine', 'hbs');
// const body_parser = require('body-parser');
// app.use(body_parser.urlencoded({ extended: false }));
var app = express();

app.get('/', function(request,response) {
    response.send('Hello World!');
});
app.listen(8000, function() {
    console.log('Listening on Port 8000 bruhhhhhh');
});

/////////////////////// Routes ////////////////////////////////////////////////////
app.get('/cats', function (request, response) {
    response.send('Meow');
});
app.get('/dogs', function (request, response) {
    response.send('Woof');
});
app.get('/cats_and_dogs', function (request, response) {
    response.send('Living Together!');
});

/////////////////////// Route Parameters //////////////////////////////////////////
app.get('/greet/:slug', function (request, response) {
    var slug = request.params.slug;
    response.send('Hello, ' + slug + "!");
});

////////////////////// Query Parameters: Tell The Year You Were Born /////////////
app.get('/year', function (request, response) {
    var age = request.query.age;
    var year = 2017 - age || 2020
    response.send('You were born in ' + year + '!');
});

// Templates

// Templates 2

// Templates 3

// The Layout Template

// Static Files

