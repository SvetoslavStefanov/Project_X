define(['plugins/http', 'durandal/app', 'knockout', 'helper/DialogHelper', 'controllers/projectController'], function (http, app, ko, DialogHelper, projectController) {
    "use strict";

    return projectController({
        projects: ko.observableArray([]),

        attached: function () {
            var that = this;

            http.get('Project/index').then(function(response) {
                that.projects(response);
            });
        },
        viewMoreInfo: function (project) {
            window.location.hash = 'project/show/' + project.id;
            //app.showDialog(new DialogHelper(project.attributes.content, project.attributes.title, ['Затвори']));
        }
    });
});