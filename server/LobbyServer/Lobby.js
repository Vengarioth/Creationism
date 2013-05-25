module.exports = new Class({

    user: {},
    host: null,
    lobbyServer: null,

    initialize: function(lobbyServer, hostUser) {
        this.lobbyServer = lobbyServer;
        this.host = hostUser;
        this.addUser(hostUser);

        var that = this;

        hostUser.socket.on('inLobby_start', function() {
            that.start();
        });
    },

    addUser: function(user) {
        this.user[user.id] = user;

        user.socket.emit('goToLobby', this.getInfo());
    },

    getInfo: function() {
        var info = {
            user: {},
            host: this.host.id
        };

        for(var i in this.user) {
            info.user[i] = {
                id: this.user[i].id,
                name: this.user[i].name
            }
        }

    },

    removeUser: function(user) {
        delete this.user[user.id];
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