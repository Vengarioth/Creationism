var Player = require('./model/player.js');
var last_time = 0;

module.exports = new Class({

    player_list: new Array(),

    initialize: function(user_list) {
        for (var user in user_list) {
            var player = new Player(user);
            player_list.push(player);
            user.socket.on('inGame_set_choices', player.set_choices(data));
        }
        setTimeout(this.update, 100);
    },

    update: function() {
        var date = new Date();
        var ms = date.getMilliseconds();
        dt = ms - last_time;
        last_time = ms;
        for (var player in player_list) {
            player.do_update(dt);
        }
        var scoreboard = new Array();
        for (var player in player_list) {
            scoreboard.push(player.dynamicValues.population);
        }
        for (var player in player_list) {
            this.send_to_client(player, scoreboard);
        }
    },

    send_to_client: function(player, scoreboard) {
        console.log(player.dynamicValues);
        player.user.socket.emit('inGame_update', player.dynamicValues);
        player.user.socket.emit('inGame_scoreboard', scoreboard);
    }
});

