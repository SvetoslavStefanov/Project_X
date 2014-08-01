define([
    'plugins/router', 'helper/viewHelper', 'knockout', 'controllers/ShellController'
], function (router, viewHelper, ko, ShellController) {
        "use strict";

        function Shell() {
            this.setTranslationData('shell', 'shell');
            this.router = router;
            this.subRoutes = {
                project: [
                    { route: 'new', title: this.currentTranslationData.subroutes.project.new, moduleId: viewHelper.convertModuleNameToModuleId('projectCreate'), show: true},
                    { route: 'destroy/:id', title: this.currentTranslationData.subroutes.project.destroy, moduleId: viewHelper.convertModuleNameToModuleId('projectDestroy'), show: false},
                    { route: 'projectIndexAction/:action', title: this.currentTranslationData.subroutes.project.index, moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), nav: false},
                    { route: 'show/:id', title: this.currentTranslationData.subroutes.project.show, moduleId: viewHelper.convertModuleNameToModuleId('projectShow'), nav: false}
                ],
                infopage: [
                    { route: 'new', title: this.currentTranslationData.subroutes.infopage.new, moduleId: viewHelper.convertModuleNameToModuleId('infoPageCreate', 'infoPage'), show: true},
                    { route: 'show/:id', title: this.currentTranslationData.subroutes.infopage.show, moduleId: viewHelper.convertModuleNameToModuleId('infoPageShow', 'infoPage'), show: false},
                    { route: 'edit/:id', title: this.currentTranslationData.subroutes.infopage.edit, moduleId: viewHelper.convertModuleNameToModuleId('infoPageEdit', 'infoPage'), show: false},
                    { route: 'infoPageIndexAction/:action', title: this.currentTranslationData.subroutes.infopage.index, moduleId: viewHelper.convertModuleNameToModuleId('infoPageIndex',
                        'infoPage'), show: false},
                    { route: 'destroy/:id', title: this.currentTranslationData.subroutes.infopage.destroy, moduleId: viewHelper.convertModuleNameToModuleId('infoPageDestroy', 'infoPage'), show: false}
                ],
                language: [
                    {route: 'new', title: this.currentTranslationData.subroutes.language.new, moduleId: viewHelper.convertModuleNameToModuleId('languageCreate'), show: true}
                ],
                translation: [
                    { route: 'new', title: 'Създай', moduleId: viewHelper.convertModuleNameToModuleId('translationCreate'), show: true},
                    { route: 'edit/:id', title: 'Редактиране', moduleId: viewHelper.convertModuleNameToModuleId('translationEdit'), show: false}
                ]
            };

            this.routes = [
                { route: '', title: this.currentTranslationData.routes.project, moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), nav: true, name: 'project'},
                { route: 'sign/signIn', title: this.currentTranslationData.routes.signIn, moduleId: viewHelper.convertModuleNameToModuleId('signIn'), nav: false},
                { route: 'infopage', title: this.currentTranslationData.routes.infopage, moduleId: viewHelper.convertModuleNameToModuleId('infoPageIndex','infoPage'), nav: true, name: 'infopage'},
                { route: 'contact', title: this.currentTranslationData.routes.contact, moduleId: viewHelper.convertModuleNameToModuleId('contactIndex'), nav: true, name: 'contact'},
                { route: 'language', title: this.currentTranslationData.routes.language, moduleId: viewHelper.convertModuleNameToModuleId('languageIndex'), nav: true, name: 'language'},
//                { route: 'translation', title: 'Преводи', moduleId: viewHelper.convertModuleNameToModuleId('translationIndex'), nav: true, name: 'translation'},
                { route: 'sign/signOut', title: this.currentTranslationData.routes.signOut, moduleId: viewHelper.convertModuleNameToModuleId('signOut'), nav: true},
            ];

            this.activate = function () {
                this.addSubRoutes();

                router.map(this.routes).buildNavigationModel();

                return router.activate();
            };

            this.addSubRoutes = function () {
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
            };

            this.mapSubNav = function (route) {
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
            };

            this.expandSubMenu = function () {
                if (this.expandedSubMenu() === true) {
                    this.expandedSubMenu(false);
                } else {
                    this.expandedSubMenu(true);
                }
            };

            this.menuItemClicked = function (currentItem, parent) {
                parent.expandedSubMenu(false);
                router.navigate(currentItem.hash);
            };
        };

        Shell.prototype = new ShellController();

        return new Shell();
    }
);