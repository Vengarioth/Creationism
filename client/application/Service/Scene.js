Creationism.Service.Scene = new Class({

    scenes: {},
    timer: null,

    initialize: function() {
        this.timer = new VCanvas.Timer();
    },

    getScene: function(name) {
        if(typeof this.scenes[name] === 'undefined') {
            var scene = new VCanvas.Scene();
            this.scenes[name] = scene;
            this.timer.addTask(function(delta) {
                scene.renderFrame(delta);
            });
        }

        return this.scenes[name];
    },

    deleteScene: function(name) {
        if(typeof this.scenes[name] === 'undefined') {
            return;
        }

        this.scenes[name].destroy();
        delete this.scenes[name];
    }

});