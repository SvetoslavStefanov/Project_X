define(['plugins/http', 'durandal/app', 'knockout', 'controllers/ProjectController', 'plugins/router'],
    function (http, app, ko, ProjectController, router) {
    "use strict";

    function ProjectShow () {
        var that = this;

        this.projectData =  ko.observableArray([]);

        this.activate = function (projectId) {
            var that = this;

            var promise = http.get('Project/show/', {id: projectId}).then(function(response) {
                that.projectData.push(response);
            });

            this.setTranslationData();

            return promise;
        };

        this.destroyProject = function (){
            var confirmDeletion = confirm(that.currentTranslationData.confirmDeletion);

            if (confirmDeletion){
                router.navigate('project/destroy/' + this.id);
            }
        };
    }

    ProjectShow.prototype = new ProjectController();

    return ProjectShow;
});