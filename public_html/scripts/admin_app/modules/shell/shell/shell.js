define(['plugins/router', 'helper/viewHelper'], function (router, viewHelper) {
    return {
        router: router,

        activate: function () {
            router.map([
                { route: '', title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), nav: true},
                { route: 'project/show/:id', title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectShow'), nav: true}
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});