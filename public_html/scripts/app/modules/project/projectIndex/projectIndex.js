define(['plugins/http', 'durandal/app', 'knockout', 'helper/DialogHelper', 'controllers/projectController'], function (http, app, ko, DialogHelper, projectConroller) {
    "use strict";

    return projectConroller({
        projects: ko.observableArray([]),
        viewProjectUrl: function(id) {
            return '#project/'+id;
        },
        activate: function () {
        
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