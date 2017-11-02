////////////////////////////////////////// EXPRESS EXERCISES /////////////////////////////////////////////////////////
/////////////////////// Hello World ///////////////////////////////////////////////
var express = require('express');
// app.use('/static', express.static('public'));
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

///////////////////// Templates /////////////////////////////////////////////////
app.set('view engine', 'hbs');

app.get('/greet/:slug', function (request, response) {
    var name = request.params.slug;
    var age = request.query.age;
    var year = 2017 - age || 2020
    var context = {
        title: 'Hello, ' + name,
        name: name,
        year: year,
    };
    response.render('hello.hbs', context);
});

///////////////////// Templates 2 ///////////////////////////////////////////////
var animals = [
    { name: 'cats', favorite: false },
    { name: 'dogs', favorite: true },
    { name: 'tree frogs', favorite: false },
    { name: 'earth worms', favorite: false },
    { name: 'guinea pigs', favorite: false },
    { name: 'wolves', favorite: true}
];

app.get('/fav_animals', function (request, response) {
    var context = {
        title: 'Hello',
        animals: animals,
    };
    response.render('favanimals.hbs', context);
});

///////////////////// The Layout Template //////////////////////////////////////

// Static Files

