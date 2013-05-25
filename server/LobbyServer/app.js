var GameServer = require('../GameServer/app.js');

module.exports = new Class({



    initialize: function() {

    },

    onConnect: function(socket) {
        socket.emit('namePleaseEvent', {});

        socket.on('namePleaseEvent', function() {
            //ab hier user erstellen

            socket.on('selectGameEvent', function() {

                //user ins spiel schicken

            });
        });
    }


});