define(['plugins/http', 'durandal/app', 'knockout', 'helper/DialogHelper', 'controllers/projectController', 'plugins/router'],
    function (http, app, ko, DialogHelper, projectConroller, router) {
    "use strict";

    return projectConroller({
        projects: ko.observableArray([]),

        activate: function () {
        
            var that = this;

            http.get('Project/index').then(function(response) {
                that.projects(response);
            });
        },

        navigateToProjectShow: function (project) {
            router.navigate('project/show/' + project.id);
        }
    });
});