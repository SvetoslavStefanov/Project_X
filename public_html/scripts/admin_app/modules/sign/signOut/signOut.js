/**
 * Created by SveXteZ on 14-4-13.
 */
define(['plugins/http', 'controllers/SignController'],
    function (http, SignController) {
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