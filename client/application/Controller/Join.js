Creationism.Controller.Join = new Class({

    initialize: function(scope, server) {

        server.send('newLobby');

        server.send('getLobbys');

        server.on('lobbyData', function(data) {
            scope['data'] = data;

            console.log(data);
        });

    }

});

Creationism.Controller.Join.$inject = ['$scope', 'Server'];