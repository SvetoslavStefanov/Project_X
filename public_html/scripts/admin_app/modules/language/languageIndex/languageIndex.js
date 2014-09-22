/**
 * Created by SveXteZ on 14-7-26.
 */
define(['plugins/http', 'durandal/app', 'knockout', 'controllers/LanguageController'],
    function (http, app, ko, LanguageController) {
        "use strict";

        function LanguageIndex() {
            var that = this;

            this.languages = ko.observableArray([]);

            this.activate = function () {
                var that = this,
                    promise;

                promise = http.get('Language/index').then(function (response) {
                    that.languages(response.languages);
                });

                this.setTranslationData();

                return promise;
            };

            this.destroy = function () {
                var confirmDeletion = confirm(that.currentTranslationData.confirmDeletion),
                    currentLanguage = this,
                    response;

                if (confirmDeletion) {
                    response = http.post('language/destroy', {id: this.id});

                    response.then(function (response) {
                        if (response.result === true) {
                            that.languages.remove(currentLanguage);
                        }
                    });
                }
            };
        };

        LanguageIndex.prototype = new LanguageController();

        return new LanguageIndex();
    });