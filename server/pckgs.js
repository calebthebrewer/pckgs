'use strict';

var pckgs = require('./node-persist-factory')('pckgs');

module.exports = function(app) {
	app.get('/pckgs', function(req, res) {
		res.send(pckgs.values());
	});

	app.get('/pckgs/:key', function(req, res) {
		var pckg = pckgs.getItemSync(encodeURIComponent(req.params.key).toLowerCase());

		if (pckg) {
			res.send(pckg);
		} else {
			res.sendStatus(404);
		}

	});

	app.post('/pckgs/:key', function(req, res) {
		res.send(pckgs.setItemSync(encodeURIComponent(req.params.key).toLowerCase(), req.body));
	});

	app.delete('/pckgs/:key', function(req, res) {
		res.send(pckgs.removeItemSync(encodeURIComponent(req.params.key).toLowerCase()));
	});
};
