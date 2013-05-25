var Player = require('./model/player.js');
var last_time = 0;

module.exports = new Class({

    player_list: [],

    initialize: function(user_list) {
        for (var i = 0; i<user_list.length; i++) {
            var player = new Player(user_list[i]);
            this.player_list[i] = player;
            user_list[i].socket.on('inGame_set_choices', function(data) {
                player.set_choices(data);
            });
        }
        var server = this;
        setInterval(function() {server.update();}, 100);
    },

    update: function() {
        var date = new Date();
        var ms = date.getMilliseconds();
        dt = ms - last_time;
        last_time = ms;
        for (var i = 0; i<this.player_list.length; i++) {
            this.player_list[i].do_update(dt);
        }
        var scoreboard = new Array();
        for (var i = 0; i<this.player_list.length; i++) {
            scoreboard.push(this.player_list[i].dynamicValues.population);
        }
        for (var i = 0; i<this.player_list.length; i++) {
            this.send_to_client(this.player_list[i], scoreboard);
        }
    },

    send_to_client: function(player, scoreboard) {
        //console.log(player.dynamicValues);
        player.user.socket.emit('inGame_update', player.dynamicValues);
        player.user.socket.emit('inGame_scoreboard', scoreboard);
    }
});

