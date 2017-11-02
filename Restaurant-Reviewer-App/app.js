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
    let term = request.query.search;
    console.log('Search Term: ', term);
    // %name% = anything containing name; # = ignore the quotes because we put them in ourselves //
    let query = "SELECT * FROM restaurant WHERE restaurant.name ILIKE '%$1#%'"
    db.any(query, term)
    .then(function (resultsArray) {
            console.log(resultsArray);
            response.render('search_results.hbs', {results: resultsArray});
        })
        .catch(next);
});

// RESTAURANT INFO//
app.get('/restaurant/:id', function(request, response, next) {
    let id = request.params.id;
    let query = `SELECT
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

// Submit Review | **NOT COMPLETE** //
app.post('/submit_review/:id', function(request, response, next) {
    // all the request.body items //
    let query = `INSERT INTO review VALUES($1,$2,$3,$4,$5)`;
    db.result(query, []) // <--- All request.body items go inside array
        .then(function () {
            response.redirect('/');
        })
        .catch(next);

});

// Submit New Restaurant | **NOT COMPLETE** //
app.post('/restaurant/new', function(request, response, next) {
    // all the request.body items //
    let query = `INSERT INTO restaurant VAlUES()`;
    db.result(query, []) // <--- All requst.body items go inside array
        .then(function () {
            response.redirect('/')
        })
        .catch(next);
    response.render('newrestaurant.hbs');
})

app.listen(8000, function () {
    console.log('Listening on Port 8000 bruhhhhhh');
});