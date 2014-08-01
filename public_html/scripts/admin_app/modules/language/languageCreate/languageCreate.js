/**
 * Created by SveXteZ on 14-7-26.
 */
define(['plugins/http', 'knockout', 'plugins/router'], function (http, ko, router) {
    "use strict";

    function LanguageCreate () {
        this.title = ko.observable('');
        this.fullName = ko.observable('');

        this.createLanguage = function () {
            var params = {}, response;
            params.name = this.title();
            params.full_name = this.fullName();

            response = http.post('language/create', params);

            response.then(function () {
                router.navigate('language');
            });

            response.fail(function (data) {
                console.log(data, '\n\n FAIL \n\n');
            });
        };
    };

    return LanguageCreate;
});