define(['plugins/router', 'helper/viewHelper', 'knockout'], function (router, viewHelper, ko) {
        "use strict";

        return {
            router: router,
            searchString: ko.observable(),
            subRoutes: {
                infopage: [
                    { route: 'show/:id', title: 'Преглед', moduleId: viewHelper.convertModuleNameToModuleId('infoPageShow', 'infoPage'), show: false},
                    { route: 'infoPageIndexAction/:action', title: 'Инфо Страници', moduleId: viewHelper.convertModuleNameToModuleId('infoPageIndex', 'infoPage'), show: false},
                ]
            },
            routes: [
                { route: '', title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), nav: true, name: 'project'},
                { route: 'projectIndexAction/:action', title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), nav: false},
                { route: 'project/show/:id', title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectShow'), nav: false},
                { route: 'sign/signIn', title: 'Sign In', moduleId: viewHelper.convertModuleNameToModuleId('signIn'), nav: false},
                { route: 'infopage', title: 'Инфо страници', moduleId: viewHelper.convertModuleNameToModuleId('infoPageIndex', 'infoPage'), nav: true, name: 'infopage'},
                { route: 'sign/signOut', title: 'Logout', moduleId: viewHelper.convertModuleNameToModuleId('signOut'), nav: true},
            ],

            activate: function () {
                this.addSubRoutes();

                router.map(this.routes).buildNavigationModel();

                return router.activate();
            },
            addSubRoutes: function () {
                var i, subRoutes = [], route;

                for (i = 0; i < this.routes.length; i++) {
                    this.routes[i].settings = this.mapSubNav(this.routes[i].name);
                    this.routes[i].expandedSubMenu = ko.observable(false);

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
            },
            expandSubMenu: function () {
                if (this.expandedSubMenu() === true) {
                    this.expandedSubMenu(false);
                } else {
                    this.expandedSubMenu(true);
                }
            },
            menuItemClicked: function (currentItem, parent) {
                parent.expandedSubMenu(false);
                router.navigate(currentItem.hash);
            }
        };
    }

);