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
		
		res.render('players/players', {
			bodyClass: 'players'
		});
	});

	app.get('/player/:id', function(req, res) {
		let id = req.params.id;

		res.render('players/player', {
			bodyClass: 'player',
			id: id
		});
	});

	app.use(function(req, res) {
		console.log('Wrong url');
		res.status(404).redirect('/');	
	});

};