'use strict';

var bodyParser = require('body-parser');
var fs = require('fs-extra');
var path = require('path');

//express server
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 4000);
app.set('client', 'client/production');

app.use(bodyParser());
app.use(express.static(path.join(__dirname, '..', app.get(('client')))));

app.get('/browse', function(req, res) {
	var directory;
	var reqPath;

	if (req.query.path) {
		reqPath = path.join.apply(this, req.query.path.split(','));
	} else {
		reqPath = './';
	}

	try {
		directory = {
			path: fs.realpathSync(reqPath),
			files: fs.readdirSync(reqPath)
		};
	} catch (error) {
		directory = {};
	}

	if (directory.files && directory.files.indexOf('package.json') > -1) {
		directory.package = fs.readJsonSync(path.join(directory.path, 'package.json'));
		directory.package.path = reqPath;
	}

	res.send(directory);
});

require('./pckgs')(app);
require('./files')(app);
require('./scripts')(app, io);

server.listen(app.get('port'), function () {
	console.log('Doin\' something fun over at :' + app.get('port'));
});

process.on('SIGINT', process.exit.bind(process));
process.on('SIGTERM', process.exit.bind(process));
