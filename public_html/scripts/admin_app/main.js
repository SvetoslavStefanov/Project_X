define(['durandal/system', 'durandal/app'], function(system, app) {
    system.debug(false);

    app.title = 'Administration !';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot(app.convertModuleNameToModuleId('shell'), 'entrance');
    });
});