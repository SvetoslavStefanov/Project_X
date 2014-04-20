/**
 * Created by SveXteZ on 14-4-18.
 */
define(['plugins/http', 'knockout', 'plugins/router', 'controllers/InfoPageController'], function (http, ko, router, InfoPageController) {
    "use strict";

    function InfoPageDestroy () {
        this.title = ko.observable('');
        this.content = ko.observable('');

        this.canActivate = function (pageId) {
            var response;

            response = http.post('infoPage/destroy', {id: pageId});

            response.then(function (response) {
                if (response.result === true){
                    router.navigate('infopage/infoPageIndexAction/destroyed');
                }
            });

            return false;
        };
    };

    InfoPageDestroy.prototype = new InfoPageController();

    return InfoPageDestroy;
});