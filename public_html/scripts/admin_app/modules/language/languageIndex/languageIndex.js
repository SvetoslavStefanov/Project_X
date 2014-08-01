/**
 * Created by SveXteZ on 14-7-26.
 */
define(['plugins/http', 'durandal/app', 'knockout'],
    function (http, app, ko) {
        "use strict";

        function LanguageIndex() {
            var that = this;

            this.languages = ko.observableArray([]);

            this.activate = function () {
                var that = this,
                    promise = $.Deferred();

                http.get('Language/index').then(function (response) {
                    that.languages(response.languages);
                    promise.resolve();
                }).fail(function () {
                        promise.resolve();
                    });

                return promise;
            };

            this.destroy = function () {
                var confirmDeletion = confirm('Сигурни ли сте, че искате да изтриете езика ?'),
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

        return new LanguageIndex();
    });