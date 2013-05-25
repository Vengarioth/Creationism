Creationism.Controller.Main = new Class({

    initialize: function(scope, server) {
        var model = {
            name: ''
        };

        scope.submit = function() {
            console.log(model.name);
        };

        scope.model = model;
    }

});

Creationism.Controller.Main.$inject = ['$scope', 'Server'];