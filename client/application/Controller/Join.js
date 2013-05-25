Creationism.Controller.Join = new Class({

    initialize: function(scope, server) {
        server.send('getLobbys');

        server.on('lobbyData', function(data) {
            scope['data'] = data;
        });

    }

});

Creationism.Controller.Join.$inject = ['$scope', 'Server'];