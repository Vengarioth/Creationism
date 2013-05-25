Creationism.Service.Server = new Class({

    socket: null,

    initialize: function(location) {
        this.socket = io.connect(':3001');
        var that = this;

        this.socket.on('request_response', function(data) {
            that.requestCallbacks[data.id](data.data);
            delete that.requestCallbacks[data.id];
        });
    },

    on: function(key, callback) {
        this.socket.on(key, callback);
    },

    send: function(key, value) {
        this.socket.emit(key, value);
    },

    requestCallbacks: {},
    requestNumber: 0,

    request: function(route, data, callback) {
        var id = this.requestNumber++;
        this.requestCallbacks[id] = callback;

        this.socket.emit('request', {
            id: id,
            route: route,
            data: data
        });

    }

});

Creationism.Service.Server.$inject = ['$location'];