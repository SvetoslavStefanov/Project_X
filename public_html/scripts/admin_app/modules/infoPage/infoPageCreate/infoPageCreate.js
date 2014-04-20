/**
 * Created by SveXteZ on 14-4-18.
 */
define(['plugins/http', 'knockout', 'plugins/router', 'controllers/InfoPageController'], function (http, ko, router, InfoPageController) {
    "use strict";

    function ProjectCreate() {

        this.savePage = function () {
            var response, params = {};

            params.id = 0;
            params.attributes = this.skeleton;

            response = http.post('infoPage/create', params);

            response.then(function () {
                router.navigate('infopage/infoPageIndexAction/created');
            });

            response.fail(function (data) {
                console.log(data, '\n\n FAIL \n\n');
            });
        };
    };

    ProjectCreate.prototype = new InfoPageController();

    return ProjectCreate;
});