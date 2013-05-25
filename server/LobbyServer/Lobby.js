module.exports = new Class({

    user: {},
    host: null,
    lobbyServer: null,

    initialize: function(lobbyServer, hostUser) {
        this.lobbyServer = lobbyServer;
        this.host = hostUser;

        var that = this;

        hostUser.socket.on('inLobby_start', function() {
            that.start();
        });
    },

    addUser: function() {

    },

    removeUser: function() {

    },

    start: function() {

        var ready = {};
        var that = this;

        this.user.each(function(user, i) {
            ready[i] = false;

            user.socket.on('inLobby_ready', function() {
                ready[i] = true;

                var start = true;
                for(var i in ready) {
                    if(!ready[i]) {
                        start = false;
                    }
                }

                if(start) {
                    that.openGame();
                }
            });

            user.socket.emit('inLobby_isReady');
        });

    },

    openGame: function() {
        lobbyServer.openGame(this);
    }

});