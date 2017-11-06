const express = require('express');
const Promise = require('bluebird');
const app = express();
const pgp = require('pg-promise')({ promiseLib: Promise});
const db = pgp({database: 'goose'});
const body_parser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
// const passhelper = require('pbkdf2-helpers');
const pbkdf2 = require('pbkdf2');
const crypto = require('crypto');

app.use(body_parser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET_KEY || 'dev',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));
app.use(morgan('dev'));
app.use(function (request, response, next) {
    if (request.session.user) {
        next();
    } else if (request.path == '/login') {
        next();
    } else {
        response.redirect('/login');
    }
});
app.set('view engine', 'hbs');


// LOGIN //
app.get('/login', function(request, response) {
    response.render('login.hbs');
});
app.post('/login', function(request, response) {
    let email = request.body.email;
    let password = request.body.password;
    let query = `SELECT reviewer.email, reviewer.password FROM reviewer WHERE reviewer.email = $1`;    
    db.any(query, email)
    // .then(db.any(passwordq, password))
    .then(function(results){
        console.log(results[0].email);
        if (results[0] && email == results[0].email && password == results[0].password) {
            request.session.user = email
            request.session.data = 'data';
            response.redirect('/');
        } else {
            response.render('login.hbs');
        }
    })
});

// HOME //
app.get('/', function (request, response) {
    response.render('index.hbs');
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