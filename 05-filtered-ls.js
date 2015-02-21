var fs = require('fs');
var path = require('path');

var dir = process.argv[2];
var ext = '.' + process.argv[3]

fs.readdir(dir, function(err, files) {
	if (err) {
		console.log(err)
	} else {
		for (var i in files) {
			if (ext && path.extname(files[i]) !== ext) {
				continue;
			}
			console.log(files[i]);
		}
	}
})
