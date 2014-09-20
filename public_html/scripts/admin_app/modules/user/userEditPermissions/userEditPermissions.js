/**
 * Created by SveXteZ on 14-9-6.
 */
define([
    'plugins/http', 'knockout', 'plugins/router', 'controllers/UserController', 'koMapping', 'helper/permissionsHelper'
], function (http, ko, router, UserController, koMapping, permissionsHelper) {
    "use strict";

    function UserEditPermissions() {
        var that = this;

        this.selectedTab = ko.observable(null);
        this.permissions = ko.observableArray([]);
        this.tabs = [];
        this.userId = 0;
        this.buttons = ko.observableArray([]);

        this.activate = function (userId) {
            this.userId = userId;

            var query = permissionsHelper.getUserPermissions(this.userId);

            query.then(function (response) {
                that.setTabs(response.permissions);
                that.permissions(that.setPermissions(response.permissions));
            });

            return query;
        };

        this.save = function () {
            http.post('User/updatePermissions', {id: that.userId, permissions: that.getPermissions()}).then(function (response) {
                if (that.userId !== response.userId) {
                    router.navigate('user/show/' + that.userId);
                } else {
                    window.location.reload()
                }
            });
        };

        this.setPermissions = function (permissions) {
            var controllerName, actionName, result = {};

            for (controllerName in permissions) {
                result[controllerName] = ko.observableArray([]);

                for (actionName in permissions[controllerName]) {
                    result[controllerName].push({
                        actionName: actionName,
                        value: permissionsHelper.isBooleanProperty(permissions[controllerName][actionName])
                    });
                }
            }

            return result;
        };

        this.getPermissions = function() {
            var permissions = koMapping.toJS(that.permissions()),
                result = {},
                controllerName, actionName;

            for (controllerName in permissions) {
                result[controllerName] = {};

                for (actionName in permissions[controllerName]) {
                    result[controllerName][permissions[controllerName][actionName].actionName] = permissions[controllerName][actionName].value;
                }
            }

            return result;
        };

        this.setTabs = function (permissions) {
            var i, counter = 1;

            for (i in permissions) {
                this.tabs.push({number: counter++, name: i});
            }

            this.selectedTab(this.tabs[0]);
        };

        this.isTabSelected = function (tabName) {
            return this.selectedTab().name === tabName ? 'current' : 'done';
        };

        this.changeCurrentTab = function () {
            var tabIndex = 0;

            that.selectedTab(this);

            _.each(that.tabs, function (tab, index) {
                if (tab.name === that.selectedTab().name) {
                    tabIndex = index;
                    return;
                }
            });

            that.buttons()[1].active(true);
            that.buttons()[2].active(true);

            if (_.isUndefined(that.tabs[tabIndex + 2])) {
                that.buttons()[1].active(true);
                that.buttons()[2].active(false);
                that.buttons()[3].visible(true);
            }

            if (_.isUndefined(that.tabs[tabIndex - 2])) {
                that.buttons()[1].active(false);
                that.buttons()[2].active(true);
            }
        };

        this.activateNextTab = function () {
            var tabName = that.selectedTab().name,
                tabIndex = -1;

            _.each(that.tabs, function (tab, index) {
                if (tab.name === tabName) {
                    tabIndex = index;
                    return;
                }
            });

            this.active(true);
            that.buttons()[1].active(true);

            if (_.isUndefined(that.tabs[tabIndex + 1])) {
                tabIndex = that.tabs.length - 2;
            }

            if (_.isUndefined(that.tabs[tabIndex + 2])) {
                this.active(false);
                that.buttons()[3].visible(true);
            }

            that.selectedTab(that.tabs[tabIndex + 1]);

            that.getPermissions();
        };

        this.activatePrevTab = function () {
            var tabName = that.selectedTab().name,
                tabIndex = that.tabs.length;

            _.each(that.tabs, function (tab, index) {
                if (tab.name === tabName) {
                    tabIndex = index;
                    return;
                }
            });

            this.active(true);
            that.buttons()[2].active(true);

            if (_.isUndefined(that.tabs[tabIndex - 1])) {
                tabIndex = 1;
            }

            if (_.isUndefined(that.tabs[tabIndex - 2])) {
                this.active(false);
            }

            that.selectedTab(that.tabs[tabIndex - 1]);
        };

        this.switchCheckboxValue = function (data, element) {
            this.value = !this.value;

            that.permissions()[that.selectedTab().name].valueHasMutated();

            _.each(element.currentTarget.getElementsByTagName('div'), function (target) {
                if (target.classList.contains('isVisible')) {
                    target.classList.remove('isVisible');
                    target.style.display = 'none';

                    return;
                }

                if (!target.classList.contains('isVisible')) {
                    target.style.display = 'block';
                    target.classList.add('isVisible');
                }
            });

            that.buttons()[0].active(true);
        };

        this.returnChanges = function () {
            if (that.buttons()[0].active() === true) {
                that.activate(that.userId);
            }

            that.buttons()[0].active(false);
        };

        this.buttons([
            {name: 'Return Changes', active: ko.observable(false), visible: ko.observable(true), clickMethod: this.returnChanges},
            {name: 'Previous', active: ko.observable(false), visible: ko.observable(true), clickMethod: this.activatePrevTab},
            {name: 'Next', active: ko.observable(true), visible: ko.observable(true), clickMethod: this.activateNextTab},
            {name: 'Finish', active: ko.observable(true), visible: ko.observable(false), clickMethod: this.save}
        ]);
    };

    UserEditPermissions.prototype = new UserController();

    return UserEditPermissions;
});