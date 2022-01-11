const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // Set Header for the Content-Type
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>hello, peeps</p>');
    res.write('<b>hi</b>')
    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});

