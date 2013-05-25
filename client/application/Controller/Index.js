Creationism.Controller.Index = new Class({

    initialize: function(scope, translation) {
        scope['language'] = 'en_GB';

        translation.getTranslator(scope['language'], function(translator) {
            scope['translate'] = translator;
        });

        scope['switchLanguage'] = function(language) {
            scope['language'] = language;
            translation.getTranslator(language, function(translator) {
                scope['translate'] = translator;
            });
        }

    }

});

Creationism.Controller.Index.$inject = ['$scope', 'Translation'];