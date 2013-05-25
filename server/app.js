var express = require('express')
	, http = require('http')
	, path = require('path');
var app = express();

require('mootools');

app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname + '/../', 'client/')));
});

app.configure('development', function ()
{
	app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function ()
{
	console.log("server listening on port " + app.get('port'));
});

//############### Server ###############

var io = require('socket.io').listen(3001);

var LobbyServer = require('./LobbyServer/app.js');
var lobbyServer = new LobbyServer();
io.sockets.on('connection', function (socket) {
    lobbyServer.onConnect(socket);
});

