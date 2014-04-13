/**
 * Created by SveXteZ on 14-3-1.
 */
define(['plugins/http', 'knockout', 'plugins/router'], function (http, ko, router) {
    "use strict";

    return function () {
        this.title = ko.observable('');
        this.content = ko.observable('');

        this.createProject = function () {
            var params = {}, response;
            params.title = this.title();
            params.content = this.content();

            response = http.post('admin/project/create', params);

            response.then(function () {
                router.navigate('projectIndexAction/created');
            });

            response.fail(function (data) {
                console.log(data, '\n\n FAIL \n\n');
            });
        };
    };
});