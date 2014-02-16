define(['durandal/system', 'durandal/app', 'helper/viewHelper'], function(system, app, viewHelper) {
    system.debug(false);

    app.title = 'Project X Home !';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot(viewHelper.convertModuleNameToModuleId('shell'), 'entrance');
    });
});