var config = require('./config');
const http = require('http');

const server = http.createServer((request, response) => {  

	response.write('<p>test</p>');
	response.write('<p>test2</p>');

	response.end();
});

server.listen(config.port, (err) => {  
	if (err) {
		console.log('something bad happened', err);
		return;
	}

	console.log(`Server is listening on ${config.port}`);
});