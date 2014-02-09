define(['durandal/app', 'plugins/dialog'], function (app, dialog) {
    "use strict";

    return function (message, title, options){
        this.defaultTitle = 'Default Title';
        this.defaultOptions = {};

        this.selectOption = function (dialogResult){
            dialog.close(this, dialogResult);
        };

        this.getView = function (){
            return app.defaultPaths.dialogsViewsPath + 'default.html';
        };

        this.message = message;
        this.title = title || this.defaultTitle;
        this.options = options || this.defaultOptions;
    };
});