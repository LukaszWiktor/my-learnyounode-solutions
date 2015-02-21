function filterFiles(dir, ext, callback) {
	var fs = require('fs');
	var path = require('path');
	ext = '.' + ext;

	fs.readdir(dir, function(err, files) {
		if (err) {
			callback(err);
		} else {
			var filteredFiles = files.filter(function(file) {
				return ext && path.extname(file) === ext
			})
			callback(null, filteredFiles);
		}
	})
}

module.exports = filterFiles;