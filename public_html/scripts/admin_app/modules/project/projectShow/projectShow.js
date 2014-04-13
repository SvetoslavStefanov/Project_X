define(['plugins/http', 'durandal/app', 'knockout', 'controllers/ProjectController'], function (http, app, ko, ProjectController) {
    "use strict";

    function ProjectShow () {
        this.projectData =  ko.observableArray([]);

        this.activate = function (projectId) {
            var that = this;

            http.get('admin/Project/show/'+projectId).then(function(response) {
                that.projectData(response);
            });
        };
    }

    ProjectShow.prototype = new ProjectController();

    return ProjectShow;
});