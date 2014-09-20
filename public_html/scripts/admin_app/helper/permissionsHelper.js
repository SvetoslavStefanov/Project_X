/**
 * Created by SveXteZ on 14-9-20.
 */
define(['plugins/http'], function (http) {
    "use strict";

    function permissionsHelper() {
        this.constantsPermissions = backEndConfig.constants.userPermissions;

        this.isBooleanProperty = function (data) {
            if (_.isBoolean(data)) {
                return data;
            }

            return data === 'true' ? true : false;
        };

        this.permissionExist = function (permissions, controllerName, actionName) {
            if (_.isUndefined(permissions[controllerName])) {
                return false;
            }

            if (_.isUndefined(permissions[controllerName][actionName])) {
                return false;
            }

            return true;
        };

        this.checkByActionName = function (permissions, controllerName, actionName) {
            if (_.isUndefined(permissions[controllerName][actionName])) {
                return false;
            }

            return this.isBooleanProperty(permissions[controllerName][actionName]);
        };

        this.checkByControllerName = function (permissions, controllerName) {
            if (_.isUndefined(permissions[controllerName])) {
                return false;
            }

            return true;
        };

        this.checkPermissions = function (permissions, controllerName, actionName) {
            if (!this.checkByControllerName(permissions, controllerName)) {
                return false;
            }

            return this.checkByActionName(permissions, controllerName, actionName);
        };

        this.checkFromConstants = function (controllerName, actionName) {
            return this.checkPermissions(this.constantsPermissions, controllerName, actionName);
        };

        this.checkConstantsAndUserPermissions = function (userPermissions, controllerName, actionName) {
            if (!this.permissionExist(this.constantsPermissions, controllerName, actionName)) {
                return false;
            }

            if (!this.permissionExist(userPermissions, controllerName, actionName)) {
                return this.checkFromConstants(controllerName, actionName);
            }

            return this.checkPermissions(userPermissions, controllerName, actionName);
        };

        this.getUserPermissions = function (userId) {
            return http.get('User/getPermissions', {id: userId});
        }
    }

    return new permissionsHelper();
});