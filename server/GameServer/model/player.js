GROWTH_FACTOR = 0.001;

module.exports = new Class({

    user: null,

    choices: {
        core: 0,
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

    set_choice: function(element, value) {
        if (element=='coreElements') this.choices.core = value;
    },

    do_update: function(dt) {
        var c = this.choices;
        var d = this.dynamicValues;
        if (c.core != 2) {
            d.population *= 1 + d.growth * GROWTH_FACTOR * dt;
        }
    }

});