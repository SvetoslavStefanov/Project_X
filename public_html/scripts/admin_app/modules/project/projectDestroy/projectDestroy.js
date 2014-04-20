/**
 * Created by SveXteZ on 14-3-1.
 */
define(['plugins/http', 'knockout', 'plugins/router', 'controllers/ProjectController'], function (http, ko, router, ProjectController) {
    "use strict";

    function ProjectCreate () {
        this.title = ko.observable('');
        this.content = ko.observable('');

        this.canActivate = function (projectId) {
            var response;

            response = http.post('admin/project/destroy', {id: projectId});

            response.then(function (response) {
                if (response.result === true){
                    router.navigate('projectIndexAction/destroyed');
                }
            });

            return false;
        };
    };

    ProjectCreate.prototype = new ProjectController();

    return ProjectCreate;
});