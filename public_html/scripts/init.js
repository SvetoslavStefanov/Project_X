/**
 * Created by SveXteZ on 14-2-15.
 */
function isInAdmin() {
    return window.location.pathname.search('admin') > -1;
}

function buildBaseUrl() {
    var mainDir = 'scripts',
        appDir = 'app';

    if (isInAdmin()) {
        appDir = 'admin_' + appDir;
    }

    return mainDir + '/' + appDir;
};

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
    },
    deps: ['lodash', 'jquery']
});

define([
    'durandal/app', 'durandal/viewLocator', 'plugins/widget', 'require', 'helper/viewHelper', 'scripts/config.js', 'plugins/router'
], function (app, viewLocator, widget, require, viewHelper, config, router) {

    viewHelper.config = config;
    viewHelper.config.is_in_admin = isInAdmin();

    viewLocator.convertModuleIdToViewId = function (moduleId) {
        var controllerName = {name: ''},
            moduleName = viewHelper.convertModuleIdToModuleName(moduleId, controllerName);

        return viewHelper.defaultPaths.modulesViewsPath + controllerName.name + "/" + moduleName + "/" + moduleName;
    };

    //convert widget's name to widget's path
    widget.convertKindToModulePath = function (widgetName) {
        return viewHelper.defaultPaths.widgetsPath + widgetName + "/" + widgetName;
    };

    //convert widget's name to widget's views path
    widget.convertKindToViewPath = function (widgetName) {
        return viewHelper.defaultPaths.widgetsViewsPath + widgetName + "/" + widgetName;
    };

    router.updateDocumentTitle = function (instance, instruction) {
        if (instance.setTitle){
            document.title = instance.setTitle() + " | " + app.title;
        } else if (instruction.config.title) {
            if (app.title) {
                document.title = instruction.config.title + " | " + app.title;
            } else {
                document.title = instruction.config.title;
            }
        } else if (app.title) {
            document.title = app.title;
        }
    };

    require([buildBaseUrl() + '/main.js']);
});