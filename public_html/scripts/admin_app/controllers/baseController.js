/**
 * Created by SveXteZ on 14-2-15.
 */
define(['helper/viewHelper', 'durandal/system', 'knockout'], function (viewHelper, system, ko) {
    "use strict";

    function BaseController() {
        this.getModuleName = function () {
            return viewHelper.convertModuleIdToModuleName(system.getModuleId(this));
        };

        this.getControllerName = function () {
            var controllerName = {name: ''};
            viewHelper.convertModuleIdToModuleName(system.getModuleId(this), controllerName);

            return controllerName.name;
        };
    }

    return BaseController;
});