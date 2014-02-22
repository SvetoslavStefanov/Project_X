define(['plugins/http', 'durandal/app', 'knockout', 'komapping'], function (http, app, ko, komapping) {
    "use strict";

    return {
        projectData: ko.observableArray([]),

    	activate: function (projectId) {
    	    var that = this;

    	    http.get('Project/show/'+projectId).then(function(response) {
                that.projectData.push(response);
    	    });
    	}
    }
});