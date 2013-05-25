Creationism.Controller.Game = new Class({

    initialize: function(scope, server) {

        scope.setChoice = function(element, value) {
            var data = {
                type: element,
                value: value
            };

            console.log(data);
            server.send('inGame_setChoice', data);
        };

    }

});

Creationism.Controller.Game.$inject = ['$scope', 'Server'];