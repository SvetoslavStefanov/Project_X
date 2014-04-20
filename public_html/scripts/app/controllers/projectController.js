/**
 * Created by SveXteZ on 14-2-15.
 */
define([ 'knockout', 'controllers/BaseController'], function (ko, BaseController) {
    "use strict";

    function ProjectController () {
        this.getProjects = function (){
            console.log('we are at the right place !');
        }
    }

    ProjectController.prototype = new BaseController();

    return ProjectController;
});