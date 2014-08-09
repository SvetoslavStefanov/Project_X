/**
 * Created by SveXteZ on 14-8-3.
 */
define(['plugins/http', 'knockout', 'plugins/router', 'controllers/UserController'], function (http, ko, router, UserController) {
    "use strict";

    function UserCreate() {
        this.activate = function () {
            this.setTranslationData();
            this.buildErrorsByFieldSkeleton();

            this.pageFromData = this.translations[this.getControllerName()]['pageFromTemplate'];
        };

        this.saveUser = function () {
            var params = {},
                that = this,
                response;
            params = this.skeleton;

            response = http.post('user/create', params);

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