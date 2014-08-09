/**
 * Created by SveXteZ on 14-8-3.
 */
define(['plugins/http', 'durandal/app', 'knockout', 'controllers/UserController', 'plugins/router'],
    function (http, app, ko, UserController, router) {
        "use strict";

        var actionBoxStatusClasses = {
            destroyed: 'danger'
        };

        function UserIndex() {
            var that = this;

            this.users = ko.observableArray([]);
            this.actionBoxClassName = ko.observable();
            this.actionMessage = ko.observable('');

            this.actionMessage.subscribe(function (newValue) {
                var that = this;
                if (newValue.length > 0) {
                    setTimeout(function () {
                        that.actionMessage('');
                    }, 4000);
                }
            }, this);

            this.activate = function () {
                var that = this;

                http.get('User/index').then(function (response) {
                    that.users(response.users);
                });

                this.setTranslationData();
            };

            this.deleteItem = function (item) {
                http.post('User/destroy', {id: item.id}).then(function () {
                    that.records.remove(item);
                    that.handleAction('destroyed');
                });
            };

            this.handleAction = function(action) {
                switch (action) {
                    case 'destroyed':
                        this.actionMessage(that.currentTranslationData.actionMessage.destroyed);
                        break;
                }

                if (!_.isUndefined(actionBoxStatusClasses[action])) {
                    this.actionBoxClassName(actionBoxStatusClasses[action]);
                }
            };

            this.openUserProfile = function () {
                router.navigate('user/show/' + this.id);
            };
        }

        UserIndex.prototype = new UserController();

        return new UserIndex();
    });