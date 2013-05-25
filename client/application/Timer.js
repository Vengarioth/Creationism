var Timer = new Class({

    intervalID: null,
    tasks: [],

    currentTime: 0,
    lastTime: 0,

    initialize: function() {

        var self = this;
        this.currentTime = new Date().getTime();

        this.intervalID = setInterval(function() {
            self.lastTime = self.currentTime;
            self. currentTime = new Date().getTime();

            var delta = self.currentTime - self.lastTime;

            for(var i = 0; i < self.tasks.length; i++) {
                self.tasks[i](delta);
            }
        }, 16);
    },

    addTask: function(task) {
        this.tasks.push(task);
    }


});