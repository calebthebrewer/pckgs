'use strict';

var bodyParser = require('body-parser');
var fs = require('fs-extra');
var path = require('path');
var spawn = require('child_process').spawn;

//express server
var express = require('express');
var app = express();

//local storage
var packages = require('./package-store')('packages');

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
	} catch (error){
		directory = {};
	}

	if ( directory.files && directory.files.indexOf('package.json') > -1) {
		directory.package = fs.readJsonSync(path.join(directory.path, 'package.json'));
		directory.package.path = reqPath;
	}

	res.send(directory);
});

app.post('/packages', function(req, res) {
	packages.add(encodeURIComponent(req.body.path), req.body.package);
	res.send(packages.getAll());
});

app.get('/packages', function(req, res) {
	res.send(packages.getAll());
});

app.get('/packages/:path', function(req, res) {
	res.send(packages.get(req.params.path));
});

app.delete('/packages/:path', function(req, res) {
	packages.remove(req.params.path);
	res.send();
});

app.post('/run', function(req, res) {
	var path = req.body.path;
	var script = packages.get(encodeURIComponent(path)).scripts[req.body.script]
	var runningScript = spawn('cd ' + path + ' && ' + script);
	runningScript;
});

app.listen(app.get('port'), function () {
	console.log('Doin\' something fun over at :' + app.get('port'));
});

process.on('SIGINT', process.exit.bind(process));
process.on('SIGTERM', process.exit.bind(process));
