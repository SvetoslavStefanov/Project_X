/**
 * Created by SveXteZ on 14-7-26.
 */
define(['plugins/http', 'knockout', 'plugins/router', 'controllers/LanguageController'],
    function (http, ko, router, LanguageController) {
        "use strict";

        function LanguageCreate() {
            this.title = ko.observable('');
            this.fullName = ko.observable('');

            this.activate = function () {
                this.setTranslationData();
            };

            this.createLanguage = function () {
                var params = {}, response;
                params.name = this.title();
                params.full_name = this.fullName();

                response = http.post('language/create', params);

                response.then(function () {
                    router.navigate('language/index');
                });

                response.fail(function (data) {
                    console.log(data, '\n\n FAIL \n\n');
                });
            };
        };

        LanguageCreate.prototype = new LanguageController();

        return LanguageCreate;
    });