/**
 * Created by SveXteZ on 14-8-3.
 */
define(['knockout', 'controllers/BaseController'], function (ko, BaseController) {
    "use strict";

    function UserController() {
        this.skeleton = {
            username: '',
            info: '',
            password: '',
            email: '',
            selected_lang: '',
            real_name: '',
            pic: '',
            pic_src: ''
        };

        this.errorsByField = {};

        this.buildErrorsByFieldSkeleton = function() {
            var i;

            for (i in this.skeleton) {
                this.errorsByField[i] = ko.observable();
            }
        };

        this.matchErrors = function (errors) {
            var i, a;

            for (i in this.errorsByField) {
                for (a in errors) {
                    if (i === a) {
                        this.errorsByField[i](errors[a]);
                    }
                }
            }
        };
    }

    UserController.prototype = new BaseController();

    return UserController;
});