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
            var promise = $.Deferred(),
                that = this;

            this.pageId = pageId;

            http.get('infoPage/edit', {id: pageId}).then(function (response) {
                that.skeleton = that.transformSkeletonToObservables(response.pageData.attributes);
                promise.resolve();
            });

            return promise;
        };

        this.savePage = function () {
            var response, params = {},
                that = this;

            params.id = this.pageId;
            params.attributes = this.transformSkeletonFromObservables(this.skeleton);

            response = http.post('infoPage/update', params);

            response.then(function () {
                router.navigate('infopage/show/' + that.pageId);
            });

            response.fail(function (data) {
                console.log(data, '\n\n FAIL \n\n');
            });
        };
    };

    InfoPageEdit.prototype = new InfoPageController();

    return InfoPageEdit;
});