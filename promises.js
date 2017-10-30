// /////////////////////////////////// Web Scraping /////////////////////////////////////////////////
// // Use Promise.all and request-promise to retrieve the HTML files for all the web pages.//
var urls = [
    'https://en.wikipedia.org/wiki/Futures_and_promises',
    'https://en.wikipedia.org/wiki/Continuation-passing_style',
    'https://en.wikipedia.org/wiki/JavaScript',
    'https://en.wikipedia.org/wiki/Node.js',
    'https://en.wikipedia.org/wiki/Google_Chrome'
];
var p1 = urls[0];
var p2 = urls[1];
var p3 = urls[2];
var p4 = urls[3];
var p5 = urls[4];

// // // Promise.all version //
// Promise.all([p1, p2, p3, p4, p5])
//     .then(function () {
//         console.log('Here are all the links: ', p1, p2, p3, p4, p5);
// })

// // request-promise version //
var rp = require('request-promise');

// for (i = 0; i < urls.length; i++) {
//     rp(urls[i])
//         .then(function (result) {
//             console.log(result);
//         })
//         .catch(function(e) {
//             console.error(e);
//         })
// }

////////////////////////////////////// Chaining /////////////////////////////////////////////////
// Using request-promise and fs-promise modules build a function called saveWebPage which takes two parameters, url and filename. 
// The function should chain the two promises together to download the URL and then save the file.
var fs = require('fs-promise');

function saveWebPage(url, filename) {
    rp(url)
        .then(function (url) {
            fs.writeFile(filename, url)
            console.log('URL saved on: ', filename);
        })
        .catch(function (e) {
            console.error(e);
        })
}

saveWebPage('https://www.google.com/', 'test.js');


////////////////////////////////////// Cat 2 Files /////////////////////////////////////////////////
// Write a function that takes two input filenames and one output filename. Read the files and combine the file contents. 
// Write the combined contents to the output file. Use a promise style to chain the reading and writing together.
function save2files(inputfile1, inputfile2, outputfile) {
    const promise1 = fs.readFile(inputfile1);
    const promise2 = fs.readFile(inputfile2);
    Promise
        .all([promise1, promise2])
        .then(function (buffers) {
            var contents1 = buffers[0].toString();
            var contents2 = buffers[1].toString();
            full_content = contents1 + contents2;
            return full_content;
        })
        .then(function (full_content) {
            return fs.writeFile(outputfile, full_content);
        })
        .then(function () {
            console.log('Files saved at: ', outputfile);
        })
        .catch(function (e) {
            console.error(e);
        })
}

save2files('test.js', 'justtext.js', 'cat2files.js')


////////////////////////////////////// Resolve, Reject /////////////////////////////////////////////////
// Write a promise that adds two numbers and resolves the answer.However, if the two inputs provided are not both numbers reject the promise.


