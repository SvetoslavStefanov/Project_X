/**
 * Created by SveXteZ on 14-2-15.
 */
define([
    'helper/viewHelper', 'durandal/system', 'knockout', 'koMapping'
], function (viewHelper, system, ko, koMapping) {
    "use strict";

    function BaseController() {
        var that = this;
        this.translations = backEndConfig.translations;
        this.currentTranslationData = {};
        this.widgetsPath = viewHelper.defaultPaths.widgetsPath;

        this.setTranslationData = function (controllerName, fileName) {
            if (_.isUndefined(controllerName)) {
                controllerName = this.getControllerName();
            }

            if (_.isUndefined(fileName)) {
                fileName = this.getModuleName();
            }

            this.currentTranslationData = this.translations[controllerName][fileName];
        };

        this.findTranslationByProperty = function (propertyName) {
            var i;

            for (i = 0; i < this.translations.length; i++) {
                if (this.translations[i].property_name == propertyName) {
                    return this.translations[i].translated;
                }
            }

            return 'No Translation';
        };

        this.getModuleName = function () {
            return viewHelper.convertModuleIdToModuleName(system.getModuleId(this));
        };

        this.getControllerName = function () {
            var controllerName = {name: ''};
            viewHelper.convertModuleIdToModuleName(system.getModuleId(this), controllerName);

            return controllerName.name;
        };

        this.getControllerFolder = function () {
            return viewHelper.defaultPaths.modulesViewsPath + this.getControllerName() + "/";
        };

        this.transformSkeletonFromObservables = function (data) {
            var newData = {};

            _.each(data, function (item, key) {
                if (ko.isObservable(item)) {
                    newData[key] = ko.utils.unwrapObservable(item);
                } else {
                    newData[key] = item;
                }
            });

            return newData;
        };

        this.transformSkeletonToObservables = function (data) {
            var observableProperties = this.getSkeletonsObservableProperties();
            var newData = koMapping.fromJS(data, {
                'observe': observableProperties
            });

            return newData;
        };

        this.getSkeletonsObservableProperties = function () {
            var observables = [], i;

            for (i in this.skeleton) {
                if (ko.isObservable(this.skeleton[i])) {
                    observables.push(i);
                }
            }

            return observables;
        };
    }

    return BaseController;
});