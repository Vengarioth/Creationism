Creationism.Service.Server = new Class({

    socket: null,

    initialize: function() {
        this.socket = io.connect(':3001');
    }

});