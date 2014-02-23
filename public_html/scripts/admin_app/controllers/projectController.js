/**
 * Created by SveXteZ on 14-2-15.
 */
define([ 'knockout', 'controllers/baseController'], function (ko, baseController) {
    "use strict";

    var projectController = baseController({
        getProjects: function(){
            console.log('we are at the right place !');
        }
    });

    return function (definition){
        definition.parent = projectController;

        return ko.utils.extend(projectController, definition);
    }
});