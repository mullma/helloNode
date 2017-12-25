/**
 * Created by MMM on 2017/12/13 13:24.
 */
var http = require('http');
var cluster = require('cluster');
var os = require('os');

var PORT = 1234;
var CPUS = os.cpus().length;
var i = 0;
if (cluster.isMaster) {
//	当前进程为主进程
	for (; i < CPUS; i++) {
		cluster.fork();
	}
} else {
	//当前进程为子进程
	var app = http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write('<h1>Hello ' + i + ' </h1>');
		res.end();
	});

	app.listen(PORT, function () {
		console.log('Server is running at %d', PORT);
	})
}
