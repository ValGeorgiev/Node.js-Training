var express = require('express');
var app = express();

var http = require('http').Server(app);
var morgan = require('morgan');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var config = require('./config');
var router = require('./scripts/router');

mongoose.connect(config.database, function(err) {
	if (!!err) {
		console.error(err);
	} else {
		console.log('Connected to the database');
	}
})

var hbs = exphbs.create({
	defaultLayout: 'main',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

if (process.env.NODE_ENV == "production") {
	app.enable('view cache');
} 

var player = require('./scripts/api/player')(app, express);
app.use('/player', player);

router(app);

http.listen(config.port, function() {
	console.log('Application is listening on port ' + config.port);
});
