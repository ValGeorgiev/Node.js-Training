'use strict';
var config = require('./config');
const http = require('http');
var api = require('./api/api');


const server = http.createServer((request, response) => {  

	response.setHeader('Content-Type', 'application/json');


	// let newProducts = api.sortProducts('price', 'asc');
	let newProducts = api.filterByColor('black');
	let length = newProducts.length
	for (let i = 0; i < length; i++) {
		response.write(JSON.stringify(newProducts[i], null, '\t'));
	}

	response.end();
});

server.listen(config.port, (err) => {  
	if (err) {
		console.log('something bad happened', err);
		return;
	}

	console.log(`Server is listening on ${config.port}`);
});