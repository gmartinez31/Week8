const express = require('express');
const Promise = require('bluebird');
const app = express();
const pgp = require('pg-promise')({ promiseLib: Promise});
// const dbconf = require('./db-configuration')
const db = pgp({
    database: 'goose'
});
const body_parser = require('body-parser');

app.use(body_parser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'hbs');

app.get('/', function (request, response) {
    response.render('index.hbs')
});

app.get('/submit', function (request, response, next) {
    var term = request.query.search;
    console.log('Search Term: ', term);
    // %name% = anything containing name; # = ignore the quotes because we put them in ourselves //
    var query = "SELECT * FROM restaurant WHERE restaurant.name ILIKE '%$1#%'"
    db.any(query, term)
    .then(function (resultsArray) {
            console.log(resultsArray);
            response.render('search_results.hbs', {results: resultsArray});
        })
        .catch(next);
});

app.listen(8000, function () {
    console.log('Listening on Port 8000 bruhhhhhh');
});