var filteredLs = require('./06-filtered-ls-module');

filteredLs(process.argv[2], process.argv[3], function(err, files) {
	if (err) {
		console.log(err)
	} else {
		for (var i in files) {
			console.log(files[i]);
		}
	}
});