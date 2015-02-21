fs = require('fs');

fs.readFile(process.argv[2], function (err, buffer) {
	var text = buffer.toString();
	var lines = text.split('\n');

	console.log(lines.length-1);
});
