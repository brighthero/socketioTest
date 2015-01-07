var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('cords', function (data) {
    	// console.log(data);
        io.sockets.emit('cordsBack', data);
    });
});

var server_port = (process.env.PORT || 3000);
server.listen(server_port);
console.log("Magic happens on " + server_port);