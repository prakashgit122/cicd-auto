
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Set the response status and content type
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send a response to the user
    res.end('Hello from CI/CD Auto Project!');
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('CI/CD Auto Project is running on port 3000');
});
