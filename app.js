var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.send(connection_string);
  console.log('New connection!', req);
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat. Have fun!' });
    socket.on('cords', function (data) {
        io.sockets.emit('cordsBack', data);
    });
});

var server_port = (process.env.OPENSHIFT_NODEJS_PORT || 3000);
var server_ip = (process.env.OPENSHIFT_NODEJS_IP || undefined);
server.listen(server_port, server_ip);
console.log("Magic happens on " + server_port);
