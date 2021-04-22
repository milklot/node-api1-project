const server = require('./api/server');

const port = process.env.PORT || 4000;

// START YOUR SERVER HERE

server.listen(port, () => {
	console.log(`server is running on port ${port}`);
});