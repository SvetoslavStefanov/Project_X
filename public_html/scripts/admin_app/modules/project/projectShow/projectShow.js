define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    "use strict";

    return {
        projectData: ko.observableArray([]),

        activate: function (projectId) {
            var that = this;

            http.get('admin/Project/show/'+projectId).then(function(response) {
                that.projectData(response);
            });
        }
    }
});