Creationism.Game.Planet = new Class({

    //population & groth
    population: 10,
    growth: 1.001,

    //civilization
    technology: 0,
    pollution: 0,

    //food & consumption
    food: 100,
    foodIncome: 0,


    nature: 100,
    animals: 100,
    polution: 0,


    //state variablen
    starving: false,
    starvingSince: 0,

    choices: {

    },

    initialize: function() {

    },

    setChoice: function(which, value) {
        this.choices[which] = value;
    },

    update: function(timeDelta) {
        var timeStep = 0.001 * timeDelta;

        //grow population
        var newPopulation = (this.growth * timeStep) * (1 - this.pollution * 0.01);
        if(this.food > newPopulation * 0.1 * timeStep) {
            this.population += newPopulation;
        }

        //kosten an food
        this.food -= this.population * 0.1 * timeStep;

        //starve
        if(this.food < 0) {
            if(this.starving) {
                this.starvingSince += timeStep;
            }
            var starve = this.food * this.starvingSince;

            this.population += starve;
            this.food = 0;
            this.starving = true;
        }else{
            this.starving = false;
        }

        //food production
        switch(this.choices['Alimentation']) {
            case 'gather':
                var foodGatherAmount = this.population * 0.4 * timeStep * this.nature * 0.01;
                if(this.nature < 0) {
                    this.nature = 0;
                }else{
                    this.food += foodGatherAmount;
                    this.nature -= timeStep;
                }
                break;
            case 'hunt':
                var foodGatherAmount = this.population * 0.4 * timeStep * this.nature * 0.01;
                if(this.animals < 0) {
                    this.animals = 0;
                }else{
                    this.food += foodGatherAmount;
                    this.animals -= timeStep;
                }
                break;
            case 'farm':
                var foodGatherAmount = this.population * 0.2 * timeStep * this.technology * 0.01 * (100 - this.pollution);
                this.food += foodGatherAmount;
                this.pollution += timeStep;


                break;
        }

        //clear value
        if(this.pollution > 100) {
            this.pollution = 100;
        }
    }

});