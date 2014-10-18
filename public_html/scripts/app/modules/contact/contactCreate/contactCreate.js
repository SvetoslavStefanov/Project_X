/**
 * Created by SveXteZ on 14-4-21.
 */
define(['plugins/http', 'knockout', 'plugins/router', 'controllers/ContactController'], function (http, ko, router, ContactController) {
    "use strict";

    var actionBoxStatusClasses = {
        created: 'success'
    };

    function ContactCreate() {
        this.actionMessage = ko.observable('');
        this.actionBoxClassName = ko.observable('');

        this.actionMessage.subscribe(function (newValue) {
            var that = this;
            if (newValue.length > 0) {
                setTimeout(function () {
                    that.actionMessage('');
                }, 4000);
            }
        }, this);


        this.messageSent = function (action) {
            switch (action) {
                case 'created':
                    this.actionMessage('Вашето съобщение беше изпратено успешно');
                    break;
            }

            if (!_.isUndefined(actionBoxStatusClasses[action])) {
                this.actionBoxClassName(actionBoxStatusClasses[action]);
            }
        };

        this.submitForm = function () {
            var params = {}, response, that = this;
            params = this.skeleton;

            response = http.post('contact/create', params);

            response.then(function () {
                that.messageSent('created');
                that.resetSkeleton();
            });

            response.fail(function (data) {
                console.log(data, '\n\n FAIL \n\n');
            });
        };
    };

    ContactCreate.prototype = new ContactController();

    return ContactCreate;
});