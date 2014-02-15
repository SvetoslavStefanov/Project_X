/**
 * Created by SveXteZ on 14-2-15.
 */
define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    "use strict";

    var baseController = {
        getProjects: function(){
            console.log('BASEEEEE')
        }
    };

    return function (definition){
        definition.parent = baseController;

        return ko.utils.extend(baseController, definition);
    }
});