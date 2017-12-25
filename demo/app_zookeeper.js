/**
 * Created by MMM on 2017/12/25 15:16.
 */
var express = require('express');
var zookeeper = require("node-zookeeper-client");

var PORT = 1234;

var app = express();
app.use(express.static('.'))
   .listen(PORT, function () {
	   console.log('server is running at %d', PORT);
   });


var CONNECTION_STRING = '127.0.0.1:2182';
var OPTIONS = {
	sessionTimeout:5000
};

var zk = zookeeper.createClient(
	CONNECTION_STRING,
	OPTIONS
);
zk.on("connected", function () {
	console.log(zk);
	zk.close();
});
zk.connect();

zk.getChildren("/", function (error, children, stat) {
	if (error) {
		console.log(error.stack);
		return;
	}
	console.log(children);
});

zk.exists("/foo", function (error, stat) {
	if (stat) {
		console.log("Node exists");
	} else {
		console.log("Node does not exist");
	}
});

zk.create("/foo", new Buffer("Hello World"), function (error, path) {
	console.log(path)
});

zk.getData("/foo", function (error, data, stat) {
	console.log(data.toString("UTF-8"));
});

zk.setData("/foo", new Buffer("HI GODE"), function (error, stat) {
	console.log(stat);
});

zk.getData("/foo", function (error, data, stat) {
	console.log(data.toString("UTF-8"));
});
zk.remove("/foo", function (error) {
	if (!error) {
		console.log("Node is DELETED");
	}
});

