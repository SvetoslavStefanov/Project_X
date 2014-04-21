/**
 * Created by SveXteZ on 14-4-21.
 */
define(['knockout', 'controllers/BaseController'], function (ko, BaseController) {
    "use strict";

    function ContactController() {
        this.subjects = [
            'Запитване',
            'Съвет'
        ];

        this.skeleton = {
            subject: ko.observable(''),
            content: ko.observable(''),
            email: ko.observable('')
        };

        this.resetSkeleton = function () {
            this.skeleton['subject']('');
            this.skeleton['content']('');
            this.skeleton['email']('');
        };
    }

    ContactController.prototype = new BaseController();

    return ContactController;
});