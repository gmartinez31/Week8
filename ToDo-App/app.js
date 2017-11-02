// In order to use express //
const express = require('express');
const app = express();
// Link up to database & use promises to query//
const dbConfig = require('./dbconf');
const pgp = require('pg-promise')({});
const db = pgp(dbConfig);
// For handlebars templating //
app.set('view engine', 'hbs');
// Linking our static files //
app.use('/static', express.static('public'));
// Parsing body content //
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));


// HOME //
app.get('/', function (request, response) {
    db.any('SELECT * FROM task')
        .then(function (todos) {
            response.render('todos.hbs', {todos: todos});
        });
    // response.render('todos.hbs');
});
// Add a ToDo Template and Route //
app.get('/add', function (request, response) {
    response.render('add.hbs');
});
// Displays Finished ToDo's //
app.get('/done', function (request, response, next) {
    db.any('SELECT * FROM task WHERE task.done is TRUE')
        .then(function(todos) {
            response.render('accomplished.hbs', {todos:todos});
        })
        .catch(next);
});
// For Submitting a new ToDo to database //
app.post('/submit', function (request, response, next) {
    console.log(request.body)
    var desc = request.body.description;
    var full = request.body.fullname;
    var query = "INSERT INTO task VALUES(default, $1, $2, false)";
    db.result(query, [full, desc])
        .then(function() {
            response.redirect('/');
        })
        .catch(next);
});

app.listen(8000, function () {
    console.log('Listening on Port 8000 bruhhhhhh');
});