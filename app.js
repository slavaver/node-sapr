const http = require('http');
const port = process.evn.PORT || 3000;

const server = http.createServer()

server.on('request', (req, res) => {
    console.log('Запрос');
    let name = require('url').parse(req.url, true).query.name;
    if (name === undefined) name = 'World';
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`Hello, ${name}!`)
});

server.on('connection', () => console.log('Подключение'))
server.listen(port, () => { console.log(`Сервер работает на порте ${port}`) })