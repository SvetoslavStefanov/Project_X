/**
 * Created by SveXteZ on 14-8-7.
 */
define([
    'plugins/http', 'knockout', 'plugins/router', 'controllers/UserController', 'ckeditor', 'helper/imageHelper'
], function (http, ko, router, UserController, ckeditor, imageHelper) {
    "use strict";

    function UserEdit() {
        this.userId = 0;
        this.isEditingUser = true;
        this.image = new imageHelper();

        this.activate = function (userId) {
            var that = this;

            this.userId = userId;

            var promise = http.get('User/edit', {id: userId}).then(function (response) {
                that.skeleton = that.transformSkeletonToObservables(response.user.attributes);
            })

            this.setTranslationData();
            this.buildErrorsByFieldSkeleton();
            this.pageFromData = this.translations[this.getControllerName()]['pageFromTemplate'];

            return promise;
        };

        this.saveUser = function (formElement) {
            var response,
                that = this,
                formData = new FormData(formElement);

            formData.append('id', this.userId);

            response = http.post('user/update', formData, {
                contentType: false,
                processData: false
            });

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

        this.goToEditUserPermssions = function () {
            router.navigate('user/editPermissions/' + this.userId);
        };
    };

    UserEdit.prototype = new UserController();

    return UserEdit;
});