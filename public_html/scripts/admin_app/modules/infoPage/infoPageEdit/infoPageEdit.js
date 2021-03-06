/**
 * Created by SveXteZ on 14-3-1.
 */
define([
    'plugins/http', 'knockout', 'plugins/router', 'controllers/InfoPageController', 'ckeditor'
], function (http, ko, router, InfoPageController, ckeditor) {
    "use strict";

    function InfoPageEdit() {
        this.pageId = 0;

        this.activate = function (pageId) {
            var that = this;

            this.pageId = pageId;

            var promise = http.get('infoPage/edit', {id: pageId}).then(function (response) {
                that.skeleton = that.transformSkeletonToObservables(response.pageData);
            });

            this.setTranslationData();
            this.pageFromData = this.translations[this.getControllerName()]['pageFromTemplate'];

            return promise;
        };

        this.savePage = function () {
            var response, params = {},
                that = this;

            params = this.transformSkeletonFromObservables(this.skeleton);
            params.id = this.pageId;

            response = http.post('infoPage/update', params);

            response.then(function () {
                router.navigate('infoPage/show/' + that.pageId);
            });

            response.fail(function (data) {
                console.log(data, '\n\n FAIL \n\n');
            });
        };
    };

    InfoPageEdit.prototype = new InfoPageController();

    return InfoPageEdit;
});