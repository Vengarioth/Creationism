Creationism.App = angular.module('Creationism', []);

Creationism.App.config([
	'$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'application/template/main.html',
            controller: Creationism.Controller.Main
        });
        $routeProvider.when('/game', {
            templateUrl: 'application/template/game.html',
            controller: Creationism.Controller.Game
        });
	}
]);

for(var i in Creationism.Service) {
    Creationism.App.service(i, Creationism.Service[i]);
}

Creationism.App.run([function () {

}]);