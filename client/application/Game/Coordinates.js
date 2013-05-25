var a = 1664525, c = 1013904223, m = Math.pow(2, 32);
var x = 0;

var set_seed = function(seed) {
    x = seed;
    var discard = random(1);
};
var random = function(max) {
    x = (a * x + c) % m;
    return x / m * max;
};

var pollution_coordinates = function(pollution) {
    set_seed(1);
    var list = [];
    for (var i = 0; i < pollution; i++) {
        var coords = [Math.floor(random(400)), Math.floor(random(200))];
        list.push(coords)
    }
    return list;
};