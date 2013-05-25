Creationism.Controller.Game = new Class({

    initialize: function(scope, planet) {

        scope.setChoice = function(element, value) {

        };

        scope.presentValue = function(value) {
            return Math.floor(value);
        };

        scope.planet = planet.getPlanet();

        planet.start();

        setInterval(function() {
            scope.$apply();
        }, 300)

    }

});

Creationism.Controller.Game.$inject = ['$scope', 'Planet'];