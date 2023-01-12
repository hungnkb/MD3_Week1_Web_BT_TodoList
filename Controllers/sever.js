const http = require('http');
const fs = require('fs');
const qs = require('qs');

const sever = http.createServer((req, res) => {
    if (req.method == 'GET') {
        fs.readFile('../Views/todo.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const todoList = qs.parse(data);
            console.log(todoList)
            fs.readFile('../Views/display.html', 'utf-8', (err, data) => {
                console.log(data)
                if (err) {
                    console.log(err);
                }
                data = data.replace('{todoList}', todoList.content);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
}).listen(8080, () => console.log('sever is running at localhost:8080'))