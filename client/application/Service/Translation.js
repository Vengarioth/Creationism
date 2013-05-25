Creationism.Service.Translation = new Class({

    languagePacks: {},
    httpService: null,

    initialize: function(http) {
        this.httpService = http;
    },

    getTranslator: function(language, callback) {

        this.loadLanguage(language, function(languagePack) {
            callback(function(key) {
                return languagePack[key];
            })
        });

    },

    loadLanguage: function(language, callback) {

        if(typeof this.languagePacks[language] === 'undefined') {
            var that = this;
            this.httpService.get('application/lang/' + language + '/main.json').success(function(data) {
                that.languagePacks[language] = data;
                callback(data);
            });
        }else{
            callback(this.languagePacks[language]);
        }
    }

});

Creationism.Service.Translation.$inject = ['$http'];