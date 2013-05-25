Creationism.Controller.Main = new Class({

    initialize: function(scope, server) {
        var model = {
            name: ''
        };

        scope.submit = function() {
            server.request('user.setName', {name: model.name}, function(response) {
                console.log(response);
            })
        };

        scope.model = model;
    }

});

Creationism.Controller.Main.$inject = ['$scope', 'Server'];