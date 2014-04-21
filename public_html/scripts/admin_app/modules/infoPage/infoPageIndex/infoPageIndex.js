/**
 * Created by SveXteZ on 14-4-18.
 */
define([
    'plugins/http', 'durandal/app', 'knockout', 'controllers/InfoPageController', 'plugins/router', 'helper/viewHelper'
], function (http, app, ko, InfoPageController, router, viewHelper) {
    "use strict";

    var actionBoxStatusClasses = {
        created: 'success',
        destroyed: 'danger'
    };

    function infoPageIndex() {
        this.pages = ko.observableArray([]);
        this.actionMessage = ko.observable('');
        this.actionBoxClassName = ko.observable('');

        this.actionMessage.subscribe(function (newValue) {
            var that = this;
            if (newValue.length > 0) {
                setTimeout(function () {
                    that.actionMessage('');
                    router.navigate('', { replace: true, trigger: false });
                }, 4000);
            }
        }, this);

        this.activate = function (action) {
            var that = this;


            http.get('InfoPage/index').then(function (response) {
                that.pages(response.pages);
            });

            if (!_.isUndefined(action)) {
                switch (action) {
                    case 'created':
                        this.actionMessage('Направихте нова страница');
                        break;
                    case 'destroyed':
                        this.actionMessage('Изтрихте страницата');
                        break;
                }

                if (!_.isUndefined(actionBoxStatusClasses[action])) {
                    this.actionBoxClassName(actionBoxStatusClasses[action]);
                }
            }
        };

        this.navigateToProjectShow = function (project) {
            router.navigate('infopage/show/' + project.id);
        };
    };

    infoPageIndex.prototype = new InfoPageController();

    return new infoPageIndex();
});