const express = require('express');
const Promise = require('bluebird');
const app = express();
const pgp = require('pg-promise')({ promiseLib: Promise});
const db = pgp({database: 'goose'});
const body_parser = require('body-parser');

app.use(body_parser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'hbs');

// HOME //
app.get('/', function (request, response) {
    response.render('index.hbs')
});

// SEARCH //
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

// RESTAURANT INFO//
app.get('/restaurant/:id', function(request, response, next) {
    var id = request.params.id;
    var query = `SELECT
                    restaurant.name,
                    restaurant.address,
                    restaurant.category,
                    reviewer.name as reviewer_name,
                    review.title,
                    review.stars,
                    review.review
                FROM
                    restaurant
                LEFT OUTER JOIN
                    review on review.restaurant_id = restaurant.id
                LEFT OUTER JOIN
                    reviewer on review.reviewer_id = reviewer.id
                WHERE
                    restaurant.id = $1`
    db.any(query, id)
        .then(function (reviews) {
            console.log("Reviews: ", reviews);
            response.render('restaurants.hbs', {
                restaurant: reviews[0],
                reviews: reviews,
                hasReviews: reviews[0].reviewer_name
            });
        })
        .catch(next);
});


app.listen(8000, function () {
    console.log('Listening on Port 8000 bruhhhhhh');
});