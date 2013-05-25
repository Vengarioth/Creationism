Creationism.Service.Asset = new Class({

    manager: null,

    initialize: function() {
        this.manager = new VCanvas.AssetManager();
    },

    getImage: function(src, callback) {
        this.manager.load(src, callback);
    }

});