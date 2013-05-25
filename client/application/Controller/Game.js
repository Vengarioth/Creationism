Creationism.Controller.Game = new Class({

    initialize: function(scope, server) {

        scope.setCoreElement = function(value) {
            var data = {
                type: 'coreElement',
                value: value
            };

            console.log(data);
            server.send('inGame_setChoices', data);
        };

    }

});

Creationism.Controller.Game.$inject = ['$scope', 'Server'];