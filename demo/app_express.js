/**
 * Created by MMM on 2017/12/13 13:03.
 */
var express = require('express');

var PORT = 1234;

var app = express();
app.use(express.static('.'))
   .listen(PORT, function () {
	   console.log('server is running at %d', PORT);
   });

app.get('/hello', function (req, res) {
	res.send('Hello World!');
});

