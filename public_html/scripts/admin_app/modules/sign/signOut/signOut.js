/**
 * Created by SveXteZ on 14-4-13.
 */
define(['plugins/http', 'controllers/SignController'],
    function (http, SignController) {
        "use strict";

        function SignOut() {
            this.canActivate = function () {
                http.get('Sign/out').fail(function () {
                    backEndConfig.currentUser = null;
                });

                return false
            };
        };

        SignOut.prototype = new SignController();

        return SignOut;
    });