/**
 * Created by SveXteZ on 14-2-15.
 */
define(['helper/viewHelper', 'durandal/system', 'knockout'], function (viewHelper, system, ko) {
    "use strict";

    var baseController = {
        getModuleName: function (){
            return viewHelper.convertModuleIdToModuleName(system.getModuleId(this));
        },
        getControllerName: function (){
            var controllerName = {name: ''};
            viewHelper.convertModuleIdToModuleName(system.getModuleId(this), controllerName);

            return controllerName.name;
        }
    };

    return function (definition){
        definition.parent = baseController;

        return ko.utils.extend(baseController, definition);
    }
});