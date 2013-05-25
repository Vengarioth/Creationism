var GameServer = require('../GameServer/app.js');
var User = require('./User.js');
var Lobby = require('./Lobby.js');

module.exports = new Class({

    user: {},
    lobbys: {},

    initialize: function() {

    },

    onConnect: function(socket) {
        if(typeof this.user[socket.id] === 'undefined') {
            var user = new User(socket);
            this.user[user.id] = user;

            var that = this;

            user.name = user.id;

            //new GameServer([user]);

            user.socket.on('setName', function(data) {

                user.name = data.name;

                user.socket.on('joinLobby', function(data) {
                    that.lobbys[data.lobby].addUser(user);
                });

                user.socket.on('openLobby', function(data) {
                    var lobby = that.openLobby(user);
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