define(['durandal/system', 'durandal/app', 'helper/viewHelper'], function(system, app, viewHelper) {
    system.debug(true);

    app.title = 'Administration !';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {

        //Show the app by setting the root view model for our application with a transition.
        system.acquire('../../../translations/' + backEndConfig.language.default.name).then(function (data) {
            backEndConfig.translations = data;
            app.setRoot(viewHelper.convertModuleNameToModuleId('shell'), 'entrance');
        });
    });
});
