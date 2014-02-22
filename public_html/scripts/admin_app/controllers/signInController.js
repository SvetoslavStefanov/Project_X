define(['plugins/http', 'durandal/app', 'knockout', 'controllers/baseController'], function (http, app, ko, baseController) {
    "use strict";

    var signInController = baseController({
        
    });

    return function (definition){
        definition.parent = signInController;
        return ko.utils.extend(signInController, definition);
    }
});