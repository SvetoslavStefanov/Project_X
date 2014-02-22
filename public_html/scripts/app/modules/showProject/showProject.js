define(['plugins/http', 'durandal/app', 'knockout', 'plugins/serializer', 'helper/DialogHelper'], function (http, app, ko, serializer, DialogHelper) {
    "use strict";

    return {
        projectData: {},

    	activate: function (projectId) {
    	    var that = this;
            if(!(parseInt(projectId) > 0)) {
                return false;
            }
    	    http.get('Project/show/'+projectId).then(function(response) {
                that.projectData = response;
    	    });
    	},
    }

});