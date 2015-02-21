var http = require('http');
var bl = require('bl');
var assert = require('assert');

assert.equal(process.argv.length, 5, '3 args expected');

var result = ["", "", ""];
var count = 0;

var printResultIfAllReady = function() {
    count++;
    if (count == 3) {
        console.log(result.join('\n'));
    }
}

for (var i = 0; i < 3; i++) {
    http.get(process.argv[2 + i], function(i) {
        return function(response) {
            response.pipe(bl(function(err, data) {
                result[i] = data.toString();
                printResultIfAllReady();
            }))
        };
    }(i));
}
