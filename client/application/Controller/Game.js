Creationism.Controller.Game = new Class({

    initialize: function(scope, planet, scene, asset) {

        var viewport = new VCanvas.Viewport($('#Viewport')[0]);
        scene.getScene('Map').renderTo(viewport);

        scope.setChoice = function(element, value) {

        };

        scope.presentValue = function(value) {
            return Math.floor(value);
        };

        scope.planet = planet.getPlanet();

        planet.start();

        setInterval(function() {
            scope.$apply();
        }, 300);

        asset.getImage('graphics/g_anarchy.png', function(htmlImage) {
            var image = new VCanvas.Image(htmlImage);

            var sprite = new VCanvas.Sprite(1,1, image);
            var animationNode = new VCanvas.Node.Drawable(sprite);
            var transformationNode = new VCanvas.Node.Transformation();
            transformationNode.addNode(animationNode);

            scene.getScene('Map').addNode(transformationNode);
        });

    }

});

Creationism.Controller.Game.$inject = ['$scope', 'Planet', 'Scene', 'Asset'];