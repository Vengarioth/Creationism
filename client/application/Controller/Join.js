Creationism.Controller.Join = new Class({

    initialize: function(scope, server) {
        server.send('getLobbys');
    }

});

Creationism.Controller.Join.$inject = ['$scope', 'Server'];