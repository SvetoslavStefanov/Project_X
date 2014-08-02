/**
 * Created by SveXteZ on 14-4-18.
 */
define([
    'plugins/http', 'durandal/app', 'knockout', 'controllers/InfoPageController', 'plugins/router'
], function (http, app, ko, InfoPageController, router) {
    "use strict";

    function InfoPageShow() {
        var that = this;
        this.pageData = ko.observableArray([]);

        this.activate = function (pageId) {
            var that = this;

            http.get('InfoPage/show', {id: pageId}).then(function (response) {
                that.pageData.push(response.pageData);
            });

            this.setTranslationData();
        };

        this.destroyPage = function () {
            var confirmDeletion = confirm(that.currentTranslationData.confirmDeletion);

            if (confirmDeletion){
                router.navigate('infoPage/destroy/' + this.id);
            }
        };

        this.editPage = function () {
            router.navigate('infoPage/edit/' + this.id);
        };
    }

    InfoPageShow.prototype = new InfoPageController();

    return InfoPageShow;
});