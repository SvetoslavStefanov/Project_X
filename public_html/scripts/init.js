/**
 * Created by SveXteZ on 14-2-15.
 */
function isInAdmin(){
    return window.location.pathname.search('admin') > -1;
}

function buildBaseUrl (){
    var mainDir = 'scripts',
        appDir = 'app';

    if (isInAdmin){
        appDir = 'admin_' + appDir;
    }

    return mainDir + '/' + appDir;
};
console.log(buildBaseUrl());
requirejs.config({
    baseUrl: buildBaseUrl(),
    paths: {
        'text': '../lib/require/text',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'lodash': '../lib/lodash/lodash.min',
        'templates': '../../templates' + (isInAdmin() ? '/admin' : '')
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        lodash: {
            exports: ['_']
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'lodash', 'plugins/widget', 'require'], function(system, app, viewLocator, _, widget, require) {
    system.debug(false);

    app.title = 'Administration !';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.defaultPaths = {
        modulesPath: 'modules/',
        widgetsPath: 'widgets/',
        modulesViewsPath: 'templates/modules/',
        widgetsViewsPath: 'templates/widgets/',
        dialogsViewsPath: 'templates/dialogs/'
    };

    app.extractModuleNameFromModuleControllerName = function (module){
        return module.split(/(?=[A-Z])/)[0];
    }

    //convert module's path ( modules/shell/shell ) to module's name ( shell )
    app.convertModuleIdToModuleName = function(moduleId, controllerName) {
        var modulesPathArr = app.defaultPaths.modulesPath.split('/');
        var moduleIdArr = moduleId.split('/');

        var module = _.uniq(_.remove(moduleIdArr, function(num) {
            var i;
            for (i = 0; i < modulesPathArr.length; i++) {
                if (modulesPathArr[i] === num) {
                    return false;
                }
            }

            return true;
        }));

        if (module.length > 1){
            controllerName.name = module.shift();
        }else{
            controllerName.name = module[0];
        }

        return module.join("");
    };

    //convert module's name ( shell ) to module's path ( modules/shell/shell )
    app.convertModuleNameToModuleId = function(moduleName) {
        return this.defaultPaths.modulesPath + moduleName + "/" + moduleName;
    };

    app.convertModuleNameToModuleId = function(module) {
        var moduleFolder = this.extractModuleNameFromModuleControllerName(module),
            moduleName = module;

        return this.defaultPaths.modulesPath + moduleFolder + "/" + moduleName + "/" + moduleName;
    };

    viewLocator.convertModuleIdToViewId = function(moduleId) {
        var controllerName = {name: ''},
            moduleName = app.convertModuleIdToModuleName(moduleId, controllerName);

        return app.defaultPaths.modulesViewsPath + controllerName.name + "/" + moduleName + "/" + moduleName;
    };

    //convert widget's name to widget's path
    widget.convertKindToModulePath = function (widgetName){
        return app.defaultPaths.widgetsPath + widgetName + "/" + widgetName;
    };

    //convert widget's name to widget's views path
    widget.convertKindToViewPath = function (widgetName){
        return app.defaultPaths.widgetsViewsPath + widgetName + "/" + widgetName;
    };

    require(['scripts/admin_app/main.js']);
});