Creationism.Service.Server = new Class({

    socket: null,

    initialize: function(location) {
        this.socket = io.connect(':3001');

        this.socket.on('goTo', function(where) {
            location.path(where);
        });
    },

    on: function(key, callback) {
        this.socket.on(key, callback);
    },

    send: function(key, value) {
        this.socket.emit(key, value);
    }

});

Creationism.Service.Server.$inject = ['$location'];