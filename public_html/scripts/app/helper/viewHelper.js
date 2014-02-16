/**
 * Created by SveXteZ on 14-2-16.
 */
define([], function () {
    "use strict";

    return {
        defaultPaths: {
            modulesPath: 'modules/',
            widgetsPath: 'widgets/',
            modulesViewsPath: 'templates/modules/',
            widgetsViewsPath: 'templates/widgets/',
            dialogsViewsPath: 'templates/dialogs/'
        },

        extractModuleNameFromModuleControllerName: function (module) {
            return module.split(/(?=[A-Z])/)[0];
        },
        //convert module's path ( modules/shell/shell ) to module's name ( shell )
        convertModuleIdToModuleName: function (moduleId, controllerName) {
            var modulesPathArr = this.defaultPaths.modulesPath.split('/');
            var moduleIdArr = moduleId.split('/');

            var module = _.uniq(_.remove(moduleIdArr, function (num) {
                var i;
                for (i = 0; i < modulesPathArr.length; i++) {
                    if (modulesPathArr[i] === num) {
                        return false;
                    }
                }

                return true;
            }));

            if (module.length > 1) {
                controllerName.name = module.shift();
            } else {
                controllerName.name = module[0];
            }

            return module.join("");
        },
        //convert module's name ( shell ) to module's path ( modules/shell/shell )
        convertModuleNameToModuleId: function (module) {
            var moduleFolder = this.extractModuleNameFromModuleControllerName(module),
                moduleName = module;

            return this.defaultPaths.modulesPath + moduleFolder + "/" + moduleName + "/" + moduleName;
        }
    };
});