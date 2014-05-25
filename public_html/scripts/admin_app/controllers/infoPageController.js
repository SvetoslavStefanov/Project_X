/**
 * Created by SveXteZ on 14-4-18.
 */
define(['knockout', 'controllers/BaseController'], function (ko, BaseController) {
    "use strict";

    function InfoPageController() {
        this.pageStatus = [
            {id: 0, name: 'Hidden'},
            {id: 1, name: 'Visible'},
            {id: 2, name: 'Inactive'}
        ];

        this.skeleton = {
            title: '',
            content: ko.observable(),
            status: '',
            seo_description: '',
            seo_keywords: ''
        };
    }

    InfoPageController.prototype = new BaseController();

    return InfoPageController;
});