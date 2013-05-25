GROWTH_FACTOR = 0.001;

module.exports = new Class({

    user: null,

    choices: {
        religion: 0,
        government: 0
    },

    staticValues: {
        gravity: 0,
        water: 0
    },

    dynamicValues: {
        population: 100000,
        stability: 0,
        happiness: 0,
        technology: 0,
        growth: 0.2,
        pollution: 0,
        energy: 0
    },

    initialize: function(user) {
        this.user = user;
        this.staticValues.gravity = Math.random();
        this.staticValues.water = Math.random();
    },

    set_choices: function(new_choices) {
        this.choices = new_choices;
    },

    do_update: function(dt) {
        this.dynamicValues.population *= 1 + this.dynamicValues.growth * GROWTH_FACTOR * dt;
    }

});