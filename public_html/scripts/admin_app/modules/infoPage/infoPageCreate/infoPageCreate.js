/**
 * Created by SveXteZ on 14-4-18.
 */
define(['plugins/http', 'knockout', 'plugins/router', 'controllers/InfoPageController'], function (http, ko, router, InfoPageController) {
    "use strict";

    function InfoPageCreate() {

        this.activate = function () {
            this.setTranslationData();
            this.pageFromData = this.translations[this.getControllerName()]['pageFromTemplate'];
        };

        this.savePage = function () {
            var response, params = {};

            params = this.skeleton;
            params.id = 0;

            response = http.post('infoPage/create', params);

            response.then(function () {
                router.navigate('infoPage/infoPageIndexAction/created');
            });

            response.fail(function (data) {
                console.log(data, '\n\n FAIL \n\n');
            });
        };
    };

    InfoPageCreate.prototype = new InfoPageController();

    return InfoPageCreate;
});