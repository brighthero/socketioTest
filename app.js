var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat. Have fun!' });
    socket.on('cords', function (data) {
        io.sockets.emit('cordsBack', data);
    });
});

var server_port = (process.env.OPENSHIFT_NODEJS_PORT || 3000);
server.listen(server_port);
console.log("Magic happens on " + server_port);
