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
            routes: [
                { route: '', title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), nav: false},
                { route: 'project', title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), nav: true},
                { route: 'project/show/:id', title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectShow'), nav: false},
                { route: 'sign/signIn', title: 'Sign In', moduleId: viewHelper.convertModuleNameToModuleId('signIn'), nav: false}
            ],

            activate: function () {
                this.addSubRoutes();

                router.map(this.routes).buildNavigationModel();

                return router.activate();
            },
            addSubRoutes: function () {
                var i, subRoutes = [], route;

                for (i = 0; i < this.routes.length; i++) {
                    this.routes[i].settings = this.mapSubNav(this.routes[i].route.split('/')[0]);

                    subRoutes.push(this.routes[i].settings.subRoutes)
                }

                subRoutes = _.filter(subRoutes, function (data) {
                    return !_.isEmpty(data);
                });

                for (route in subRoutes) {
                    for (i = 0; i < subRoutes[route].length; i++) {
                        this.routes.push(subRoutes[route][i]);
                    }
                }
            },
            mapSubNav: function (route) {
                var subRoutes = [], i, currentSubRouter;

                if (!_.isUndefined(this.subRoutes[route])) {
                    for (i = 0; i < this.subRoutes[route].length; i++) {
                        currentSubRouter = this.subRoutes[route][i];

                        currentSubRouter.route = route + "/" + currentSubRouter.route;

                        if (_.isUndefined(currentSubRouter.hash)) {
                            currentSubRouter.hash = router.convertRouteToHash(currentSubRouter.route);
                        }

                        subRoutes.push(currentSubRouter);
                    }
                }

                return {subRoutes: subRoutes};
            }
        };
    }

);