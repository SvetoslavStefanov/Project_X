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
        'koMapping': '../lib/knockout/knockout.mapping',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'lodash': '../lib/lodash/lodash.min',
        'ckeditor': '../lib/ckeditor/ckeditor',
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
    'durandal/app', 'durandal/viewLocator', 'plugins/widget', 'require', 'helper/viewHelper', 'scripts/config.js', 'plugins/router', 'knockout'
], function (app, viewLocator, widget, require, viewHelper, config, router, ko) {

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
        if (instance.setTitle) {
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

    ko.bindingHandlers.ckEditor = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var txtBoxID = $(element).attr("id"),
                options = allBindingsAccessor().richTextOptions || {};

            options.toolbar_Full = [
                ['Source', '-', 'Format', 'Font', 'FontSize', 'TextColor', 'BGColor', '-', 'Bold', 'Italic', 'Underline', 'SpellChecker'],
                [
                    'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter',
                    'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'
                ],
                ['Link', 'Unlink', 'Image', 'Table']
            ];

            // handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                if (CKEDITOR.instances[txtBoxID]) {
                    CKEDITOR.remove(CKEDITOR.instances[txtBoxID]);
                }
            });

            CKEDITOR.replace(txtBoxID);

            // wire up the blur event to ensure our observable is properly updated
            CKEDITOR.instances[txtBoxID].focusManager.blur = function () {
                var observable = valueAccessor(),
                    newValue = $("#cke_" + txtBoxID + " iframe").contents().find('body').html();

                observable(newValue);
            };
        },
        update: function (element, valueAccessor) {
            var val = ko.utils.unwrapObservable(valueAccessor());
            $(element).html(val);
        }
    }

    require([buildBaseUrl() + '/main.js']);
});