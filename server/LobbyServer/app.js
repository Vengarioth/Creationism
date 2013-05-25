var GameServer = require('../GameServer/app.js');
var User = require('./User.js');
var Lobby = require('./Lobby.js');

module.exports = new Class({

    user: {},
    lobbys: {},

    initialize: function() {

    },

    onConnect: function(socket) {
        socket.on('request', function(request) {
            console.log(request);

            socket.emit('request_response', {
                id: request.id,
                data: {

                }
            });
        });





        return;
        socket.emit('goTo', 'main');

        if(typeof this.user[socket.id] === 'undefined') {
            var user = new User(socket);
            this.user[user.id] = user;

            var that = this;

            //new GameServer([user]);

            user.socket.on('setName', function(name) {

                user.name = name;

                user.socket.emit('goTo', 'join');

                user.socket.on('getLobbys', function(data) {
                    var data = {};

                    for(var i in that.lobbys) {
                        data[i] = that.lobbys[i].getInfo();
                    }

                    user.socket.emit('lobbyData', data);
                });

                user.socket.on('joinLobby', function(data) {
                    that.lobbys[data.lobby].addUser(user);
                });

                user.socket.on('newLobby', function(data) {
                    var lobby = that.openLobby(user);
                    that.lobbys[lobby.id] = lobby;
                });
            });

        }
    },

    openLobby: function(hostUser) {
        var lobby = new Lobby(this, hostUser);
        this.lobbys[hostUser.id] = lobby;

        return lobby;
    },

    openGame: function(lobby) {

    }

});