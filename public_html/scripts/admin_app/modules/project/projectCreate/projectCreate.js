/**
 * Created by SveXteZ on 14-3-1.
 */
define(['plugins/http', 'knockout', 'plugins/router', 'controllers/ProjectController'], function (http, ko, router, ProjectController) {
    "use strict";

    function ProjectCreate () {
        this.title = ko.observable('');
        this.content = ko.observable('');

        this.activate = function () {
            this.setTranslationData();
        };

        this.createProject = function () {
            var params = {}, response;
            params.title = this.title();
            params.content = this.content();

            response = http.post('project/create', params);

            response.then(function () {
                router.navigate('project/projectIndexAction/created');
            });

            response.fail(function (data) {
                console.log(data, '\n\n FAIL \n\n');
            });
        };
    };

    ProjectCreate.prototype = new ProjectController();

    return ProjectCreate;
});