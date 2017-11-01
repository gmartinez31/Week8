////////////////////////////////////////// EXPRESS EXERCISES /////////////////////////////////////////////////////////
// Hello World
var express = require('express');
app.use('/static', express.static('public'));
app.set('view engine', 'hbs');
var app = express();

// handles get request; handler simply a function//
// handler always gets request and response //
app.get('/', function(request,response) {
    response.send('Hello World!');
});
app.listen(8000, function() {
    console.log('Listening on Port 8000 bruhhhhhh');
});


// Routes

// Route Parameters

// Query Parameters: Tell The Year You Were Born

// Templates

// Templates 2

// Templates 3

// The Layout Template

// Static Files

