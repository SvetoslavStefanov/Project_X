/**
 * Created by SveXteZ on 14-8-3.
 */
define([
    'plugins/http', 'knockout', 'plugins/router', 'controllers/UserController', 'helper/imageHelper'
], function (http, ko, router, UserController, imageHelper) {
    "use strict";

    function UserCreate() {
        this.image = new imageHelper();

        this.activate = function () {
            this.setTranslationData();
            this.buildErrorsByFieldSkeleton();

            this.pageFromData = this.translations[this.getControllerName()]['pageFromTemplate'];
            this.skeleton.pic_src = backEndConfig.config.defaultUserPic;
        };

        this.saveUser = function (formElement) {
            var response,
                that = this,
                formData = new FormData(formElement);

            response = http.post('user/create', formData, {
                contentType: false,
                processData: false
            });

            response.then(function (response) {
                if (response.result === true) {
                    router.navigate('user/show/' + response.userId);
                } else {
                    that.matchErrors(response.errors);
                }
            });

            response.fail(function (data) {
                console.log(data, '\n\n FAIL \n\n');
            });
        };
    };

    UserCreate.prototype = new UserController();

    return UserCreate;
});