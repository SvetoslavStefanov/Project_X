define(['plugins/http', 'durandal/app', 'knockout', 'controllers/ProjectController', 'plugins/router'],
    function (http, app, ko, ProjectController, router) {
    "use strict";

    function ProjectShow () {
        this.projectData =  ko.observableArray([]);

        this.activate = function (projectId) {
            var that = this;

            http.get('Project/show/', {id: projectId}).then(function(response) {
                that.projectData(response);
            });
        };

        this.destroyProject = function (){
            router.navigate('project/destroy/' + this.id);
        };
    }

    ProjectShow.prototype = new ProjectController();

    return ProjectShow;
});