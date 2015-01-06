var express = require('express');

var app = express();


app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.send("OK");
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

var server_port = (process.env.PORT || 3000);
var io = require('socket.io').listen(app.listen(server_port));
console.log("Magic happens on " + server_port);