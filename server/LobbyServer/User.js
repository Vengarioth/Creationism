module.exports = new Class({

    socket: null,
    id: null,
    name: null,

    initialize: function(socket) {
        this.socket = socket;
        this.id = socket.id;
    }

});