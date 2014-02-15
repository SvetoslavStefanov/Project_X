/**
 * Created by SveXteZ on 14-2-15.
 */
define(['plugins/http', 'durandal/app', 'knockout', 'helper/DialogHelper', 'controllers/projectController'], function (http, app, ko, DialogHelper, projectConroller) {
    "use strict";

    return projectConroller({
        projects: ko.observableArray([]),

        activate: function (id) {
            console.log('we are showing project !', id)
        }
    });
});