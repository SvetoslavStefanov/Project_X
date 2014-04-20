/**
 * Created by SveXteZ on 14-4-18.
 */
define([
    'plugins/http', 'durandal/app', 'knockout', 'controllers/InfoPageController', 'plugins/router'
], function (http, app, ko, InfoPageController, router) {
    "use strict";

    function InfoPageShow() {
        this.pageData = ko.observableArray([]);

        this.activate = function (pageId) {
            var that = this;

            http.get('InfoPage/show', {id: pageId}).then(function (response) {
                that.pageData(response.pageData);
            });
        };

        this.destroyPage = function () {
            router.navigate('infopage/destroy/' + this.id);
        };

        this.editPage = function () {
            router.navigate('infopage/edit/' + this.id);
        };
    }

    InfoPageShow.prototype = new InfoPageController();

    return InfoPageShow;
});