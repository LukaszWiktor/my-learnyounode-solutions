var http = require('http');
var url = require('url');

function route(req) {
    var parsedUrl = url.parse(req.url, true);
    var query = parsedUrl.query;
    try {
        switch (parsedUrl.pathname) {
            case '/api/parsetime': return parseIso(query, badRequest, parseTime);
            case '/api/unixtime': return parseIso(query, badRequest, unixTime);
            default: return notFound("not found " + parsedUrl.pathname);
        }
    } catch (err) {
        return badRequest(err);
    }
}

function ok(content) {
    return {
        'status': 200,
        'content': content
    };
}

function badRequest(errMsg) {
    return {
        'status' : 400,
        'content' : {
            'error' : errMsg
        }
    };
}

function notFound(errMsg) {
    return {
        'status' : 404,
        'content' : {
            'error' : errMsg
        }
    };
}

function parseIso(query, errCallback, successCallback) {
    if (!query.iso) {
        return errCallback("missing iso param");
    }
    var date = new Date(query.iso);
    if (isNaN(date)) {
        return errCallback("invalid iso date: " + query.iso);
    } else {
        return successCallback(date);
    }
}

function parseTime(date) {
    return ok({
        'hour' : date.getHours(),
        'minute' : date.getMinutes(),
        'second' : date.getSeconds()
    });
}

function unixTime(date) {
    return ok({
        'unixtime': date.getTime()
    });
}


var server = http.createServer(function(req, resp) {
    var res = route(req);
    console.log("res: ", res);
    resp.writeHeader(res.status, {'Content-Type' : 'application/json'});
    resp.write(JSON.stringify(res.content));
    resp.end();
});
server.listen(process.argv[2] || 8000);