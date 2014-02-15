define(['plugins/http', 'durandal/app', 'knockout', 'plugins/serializer', 'helper/DialogHelper'], function (http, app, ko, serializer, DialogHelper) {
    "use strict";

    return {
        projects: ko.observableArray([]),
        viewProjectUrl: function(id) {
            return '#project/'+id;
        },
        activate: function () {
        
            var that = this;
            app.on('searchUpdate',function(response) {
                that.projects(serializer.deserialize(response));
            });
            http.get('Project/index').then(function(response) {
                that.projects(serializer.deserialize(response));
            });
        },
  
        viewMoreInfo: function (project) {
            app.showDialog(new DialogHelper(project.attributes.content, project.attributes.title, ['Затвори']));
        }
    };
});