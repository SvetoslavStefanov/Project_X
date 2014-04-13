/**
 * Created by SveXteZ on 14-4-13.
 */
define(['plugins/http', 'knockout', 'controllers/SignController', 'plugins/router'],
    function (http, ko, SignController, router) {
        "use strict";

        function SignOut() {
            this.canActivate = function () {
                var promise = $.Deferred();

                http.get('admin/Sign/out').fail(function () {
                    promise.resolve();
                });

                return false
            };
        };

        SignOut.prototype = new SignController();

        return SignOut;
    });