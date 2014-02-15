define(['plugins/router', 'durandal/app', 'durandal/system'], function (router, app, system) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title: 'Проекти', moduleId: app.convertModuleNameToModuleId('projectIndex'), nav: true},
                { route: 'project/show/:id', title: 'Проекти', moduleId: app.convertModuleNameToModuleId('projectShow'), nav: true}
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});