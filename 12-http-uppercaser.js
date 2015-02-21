var http = require('http');
var mapStream = require('through2-map');

var server = http.createServer(function(req, resp) {
    if (req.method != 'POST') {
        return resp.end("Hello! Send me a POST and I'll make the content uppercase.");
    }

    req.pipe(mapStream(function (chunk) {
        return chunk.toString().toUpperCase();
    }))
        .pipe(resp);
});
server.listen(process.argv[2] || 8000)