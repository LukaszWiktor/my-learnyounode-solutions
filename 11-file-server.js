var fs = require('fs');
var http = require('http');

var filename = process.argv[3];

if (!fs.existsSync(filename)) {
    console.error('file %s not found', filename);
    process.exit(1);
}

var server = http.createServer(function(req, resp) {
    var file = fs.createReadStream(filename);
    resp.writeHead(200, {'Content-Type': 'text/plain'});
    file.pipe(resp);
});
server.listen(process.argv[2] || 8000)
    .on('error', console.log);