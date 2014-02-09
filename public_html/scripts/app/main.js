requirejs.config({
    baseUrl: 'scripts/app',
    paths: {
        'text': '../lib/require/text',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'lodash': '../lib/lodash/lodash.min',
        'templates': '../../templates'
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

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'lodash', 'plugins/widget'], function(system, app, viewLocator, _, widget) {
    //>>excludeStart("build", true);
    system.debug(false);
    //>>excludeEnd("build");

    app.title = 'Svetlio\'s test !';

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

    //convert module's path ( modules/shell/shell ) to module's name ( shell )
    app.convertModuleIdToModuleName = function(moduleId) {
        var modulesPathArr = app.defaultPaths.modulesPath.split('/');
        var moduleIdArr = moduleId.split('/');

        return _.uniq(_.remove(moduleIdArr, function(num) {
            var i;
            for (i = 0; i < modulesPathArr.length; i++) {
                if (modulesPathArr[i] === num) {
                    return false;
                }
            }

            return true;
        })).join('');
    };

    //convert module's name ( shell ) to module's path ( modules/shell/shell )
    app.convertModuleNameToModuleId = function(moduleName) {
        return this.defaultPaths.modulesPath + moduleName + "/" + moduleName;
    };

    app.start().then(function() {
        //convert module's path ( modules/shell/shell ) to module's view path
        viewLocator.convertModuleIdToViewId = function(moduleId) {
            var moduleName = app.convertModuleIdToModuleName(moduleId);

            return app.defaultPaths.modulesViewsPath + moduleName + "/" + moduleName;
        };

        //convert widget's name to widget's path
        widget.convertKindToModulePath = function (widgetName){
            return app.defaultPaths.widgetsPath + widgetName + "/" + widgetName;
        };

        //convert widget's name to widget's views path
        widget.convertKindToViewPath = function (widgetName){
            return app.defaultPaths.widgetsViewsPath + widgetName + "/" + widgetName;
        };

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot(app.convertModuleNameToModuleId('shell'), 'entrance');
    });
});