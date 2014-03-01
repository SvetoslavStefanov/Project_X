define(['plugins/router', 'helper/viewHelper', 'knockout'], function (router, viewHelper, ko) {
    "use strict";
    return {
        router: router,
        searchString: ko.observable(),
        subRoutes: {
            project: [
                { route: 'create', title: 'Създай', moduleId: viewHelper.convertModuleNameToModuleId('projectCreate')}
            ]
        },

        activate: function () {
            router.map([
                { route: ['project', ''], title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), nav: true},
                { route: 'project/show/:id', title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectShow'), nav: false},
                { route: 'sign/signIn', title: 'Sign In', moduleId: viewHelper.convertModuleNameToModuleId('signIn'), nav: false}
            ]).buildNavigationModel();

            this.addSubRoutes();

            return router.activate();
        },
        addSubRoutes: function () {
            var i;

            for (i = 0; i < router.routes.length; i++) {
                router.routes[i].settings = this.mapSubNav(router.routes[i].route);
            }
        },
        mapSubNav: function (route) {
            var subRoutes = [], i, currentSubRouter;

            if (!_.isUndefined(this.subRoutes[route])) {
                for (i = 0; i < this.subRoutes[route].length; i++) {
                    currentSubRouter = this.subRoutes[route][i];

                    currentSubRouter.route = route + "/" + currentSubRouter.route;

                    if (_.isUndefined(currentSubRouter.hash)){
                        currentSubRouter.hash = router.convertRouteToHash(currentSubRouter.route);
                    }

                    subRoutes.push(currentSubRouter);
                }
            }

            return {subRoutes: subRoutes};
        }
    };
});