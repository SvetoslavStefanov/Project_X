define(['plugins/http', 'durandal/app', 'knockout', 'controllers/projectController', 'plugins/router'],
    function (http, app, ko, projectController, router) {
    "use strict";

    return projectController({
        projects: ko.observableArray([]),

        activate: function () {
            var that = this;
            http.get('admin/Project/index').then(function(response) {
                that.projects(response.projects);
            });
        },

        navigateToProjectShow: function (project) {
            router.navigate('project/show/' + project.id);
        }
    });
});