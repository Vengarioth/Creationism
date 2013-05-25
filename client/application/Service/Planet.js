Creationism.Service.Planet = new Class({

    timer: null,
    planet: null,

    initialize: function() {
        this.timer = new Timer();
        this.planet = new Creationism.Game.Planet();
    },

    getPlanet: function() {
        return this.planet;
    },

    start: function() {
        var that = this;
        this.timer.addTask(function(timeDelta) {
            that.planet.update(timeDelta);
        });
    }

});

Creationism.Service.Planet.$inject = ['$location'];