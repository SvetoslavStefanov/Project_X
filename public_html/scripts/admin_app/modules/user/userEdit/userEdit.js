/**
 * Created by SveXteZ on 14-8-7.
 */
define([
    'plugins/http', 'knockout', 'plugins/router', 'controllers/UserController', 'ckeditor'
], function (http, ko, router, UserController, ckeditor) {
    "use strict";

    function InfoPageEdit() {
        this.userId = 0;

        this.activate = function (userId) {
            var promise = $.Deferred(),
                that = this;

            this.userId = userId;

            http.get('User/edit', {id: userId}).then(function (response) {
                that.skeleton = that.transformSkeletonToObservables(response.user.attributes);
                promise.resolve();
            });

            this.setTranslationData();
            this.buildErrorsByFieldSkeleton();
            this.pageFromData = this.translations[this.getControllerName()]['pageFromTemplate'];

            return promise;
        };

        this.saveUser = function () {
            var response, params = {},
                that = this;

            params = this.transformSkeletonFromObservables(this.skeleton);
            params.id = this.userId;

            response = http.post('user/update', params);

            response.then(function (response) {
                if (response.result === true) {
                    router.navigate('user/show/' + that.userId);
                } else {
                    that.matchErrors(response.errors);
                }

            });

            response.fail(function (data) {
                console.log(data.responseText, '\n\n FAIL \n\n');
            });
        };
    };

    InfoPageEdit.prototype = new UserController();

    return InfoPageEdit;
});