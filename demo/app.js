/**
 * Created by MMM on 2017/12/13 12:54.
 */
var http = require('http');
var fs = require('fs');

var PORT = 1234;

var app = http.createServer(function (req, res) {
	var path = __dirname + req.url;
	console.log(path);
	fs.readFile(path, function (err, data) {
		if (err) {
			res.end();
			return;
		}
		res.write(data.toString());
		res.end();
	});
}).listen(PORT, function () {
	console.log('Server i running at %d', PORT);
});
