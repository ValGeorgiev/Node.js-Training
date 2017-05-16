'use strict';

/*  Require Static API  */

var Player = require('./models/player');



module.exports = function(app) {

	app.use(function(req, res, next) {

		console.log('middleware');
		next();
	});

	app.get('/', function(req, res) {
		
		res.render('home', {
			bodyClass: 'home',
		});
	});	
	
	app.get('/players', function(req, res) {

		Player.find({}, function(err, players) {
			if (!!err) {
				res.render('error');
				return;
			}

			res.render('players/players', {
				bodyClass: 'players',
				players: players
			});

		});
		
		
	});

	app.get('/player/:id', function(req, res) {
		let id = req.params.id;

		Player.findOne({
			_id: id
		}, function(err, player) {
			if (!!err) {
				res.render('error');
				return;
			}

			if (!player) {
				res.redirect('/');
				return;
			}
			
			res.render('players/player', {
				bodyClass: 'player',
				player: player
			});

		});

	});

	app.use(function(req, res) {
		console.log('Wrong url');
		res.status(404).redirect('/');	
	});

};