//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////     Create Album     //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Write a script to create a new album in the database. You may either connect to your local database or your remote database. 
// The script will prompt the user for an album name, a year, and an artist ID. You may use the prompt-promise module to get 
// user prompts in the promise style - with this everything can be written in one straight chain. Be sure to sanitize your inputs!
var pgp = require('pg-promise')({});
var db = pgp({database: 'Album'});
var readline = require('readline');

var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

// rl.question("Album name? ", function(answer) {
//     rl.question("Year released? ", function(answer1) {
//         rl.question("Artist ID? ", function(answer2) {
//             var album = answer;
//             var year = answer1;
//             var id = answer2;

//             var query = "INSERT INTO album VALUES (default, $1, $2, $3)";
//             console.log(album, year, id);
//             db.result(query, [album, year, id])
//                 .then(function () {
//                     console.log('Created Album');
//                 })
//                 .catch(function (e) {
//                     console.log(e);
//                 });
//             return album, year, id;
//             rl.close();
//             pgp.end();
//         });
//     });
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////     Create Artist    //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

rl.question("Artist Name? ", function(answer) {
    var artist = answer;
    var query = "INSERT INTO artist VALUES (default, $1)";
    db.result(query, artist)
        .then(function () {
            console.log('Created Artist: ', artist);
        })
        .catch(function (e) {
            console.log(e);
        });
    rl.close();
    pgp.end();
});