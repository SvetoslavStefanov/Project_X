define([ 'knockout', 'controllers/baseController'], function (ko, baseController) {
    "use strict";

    var signInController = baseController({

    });

    return function (definition){
        definition.parent = signInController;

        return ko.utils.extend(signInController, definition);
    }
});