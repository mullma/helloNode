/**
 * Created by MMM on 2017/12/15 12:36.
 */
var http = require('http');
var httpProxy = require('http-proxy');

var PORT = 1234;

//创建代理服务器对象并监听错误事件
var proxy = httpProxy.createProxyServer();
proxy.on('error', function (err, req, res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	res.write('<h1>Hello World!</h1>');
	res.end();//输出空白相应数据
});

var app = http.createServer(function (req, res) {
	//执行反向代理
	proxy.web(req, res, {target:'http//localhost:8080'});
});

app.listen(PORT, function () {
	console.log('Server is running at %d', PORT);
});