/**
 * Created by SveXteZ on 14-4-21.
 */
define(['plugins/http', 'durandal/app', 'knockout', 'controllers/ContactController', 'plugins/router'],
    function (http, app, ko, ContactController, router) {
        "use strict";

        var actionBoxStatusClasses = {
            destroyed: 'danger'
        };

        function ContactIndex() {
            var that = this;

            this.records = ko.observableArray([]);
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

                var promise = http.get('Contact/index').then(function (response) {
                    that.records(response.records);
                });

                this.setTranslationData();

                return promise;
            };

            this.deleteItem = function (item) {
                http.post('Contact/destroy', {id: item.id}).then(function () {
                    that.records.remove(item);
                    that.handleAction('destroyed');
                });
            };

            this.handleAction = function(action) {
                switch (action) {
                    case 'destroyed':
                        this.actionMessage(that.currentTranslationData.actionMessages.destroyed);
                        break;
                }

                if (!_.isUndefined(actionBoxStatusClasses[action])) {
                    this.actionBoxClassName(actionBoxStatusClasses[action]);
                }
            };
        }

        ContactIndex.prototype = new ContactController();

        return new ContactIndex();
    });