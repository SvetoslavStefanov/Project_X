define([
    'plugins/router', 'helper/viewHelper', 'knockout', 'controllers/ShellController', 'plugins/http'
], function (router, viewHelper, ko, ShellController, http) {
        "use strict";

        function Shell() {
            var that = this;

            this.setTranslationData('shell', 'shell');
            this.isUserLogged = ko.observable(false);
            this.router = router;
            this.subRoutes = {
                project: [
                    { route: 'index', title: this.currentTranslationData.subroutes.project.index, moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), show: true},
                    { route: 'new', title: this.currentTranslationData.subroutes.project.new, moduleId: viewHelper.convertModuleNameToModuleId('projectCreate'), show: true},
                    { route: 'destroy/:id', title: this.currentTranslationData.subroutes.project.destroy, moduleId: viewHelper.convertModuleNameToModuleId('projectDestroy'), show: false},
                    { route: 'projectIndexAction/:action', title: this.currentTranslationData.subroutes.project.index, moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), nav: false},
                    { route: 'show/:id', title: this.currentTranslationData.subroutes.project.show, moduleId: viewHelper.convertModuleNameToModuleId('projectShow'), nav: false}
                ],
                infoPage: [
                    { route: 'index', title: this.currentTranslationData.subroutes.infopage.index, moduleId: viewHelper.convertModuleNameToModuleId('infoPageIndex',
                        'infoPage'), show: true},
                    { route: 'new', title: this.currentTranslationData.subroutes.infopage.new, moduleId: viewHelper.convertModuleNameToModuleId('infoPageCreate',
                        'infoPage'), show: true},
                    { route: 'show/:id', title: this.currentTranslationData.subroutes.infopage.show, moduleId: viewHelper.convertModuleNameToModuleId('infoPageShow',
                        'infoPage'), show: false},
                    { route: 'edit/:id', title: this.currentTranslationData.subroutes.infopage.edit, moduleId: viewHelper.convertModuleNameToModuleId('infoPageEdit',
                        'infoPage'), show: false},
                    { route: 'infoPageIndexAction/:action', title: this.currentTranslationData.subroutes.infopage.index, moduleId: viewHelper.convertModuleNameToModuleId('infoPageIndex',
                        'infoPage'), show: false},
                    { route: 'destroy/:id', title: this.currentTranslationData.subroutes.infopage.destroy, moduleId: viewHelper.convertModuleNameToModuleId('infoPageDestroy',
                        'infoPage'), show: false}

                ],
                language: [
                    {route: 'index', title: this.currentTranslationData.subroutes.language.index, moduleId: viewHelper.convertModuleNameToModuleId('languageIndex'), show: true},
                    {route: 'new', title: this.currentTranslationData.subroutes.language.new, moduleId: viewHelper.convertModuleNameToModuleId('languageCreate'), show: true}
                ],
                user: [
                    {route: 'index', title: this.currentTranslationData.subroutes.user.index, moduleId: viewHelper.convertModuleNameToModuleId('userIndex'), show: true},
                    {route: 'create', title: this.currentTranslationData.subroutes.user.create, moduleId: viewHelper.convertModuleNameToModuleId('userCreate'), show: true},
                    {route: 'show/:id', title: this.currentTranslationData.subroutes.user.show, moduleId: viewHelper.convertModuleNameToModuleId('userShow'), show: false},
                    {route: 'edit/:id', title: this.currentTranslationData.subroutes.user.edit, moduleId: viewHelper.convertModuleNameToModuleId('userEdit'), show: false}
                ]
            };

            this.routes = [
                { route: '', title: this.currentTranslationData.routes.project, moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), nav: true, name: 'project', icon: 'icon-list-alt'},
                { route: 'sign/signIn', title: this.currentTranslationData.routes.signIn, moduleId: viewHelper.convertModuleNameToModuleId('signIn'), nav: false},
                { route: 'infoPage', title: this.currentTranslationData.routes.infopage, nav: true, name: 'infoPage', icon: 'icon-list-alt'},
                { route: 'contact', title: this.currentTranslationData.routes.contact, moduleId: viewHelper.convertModuleNameToModuleId('contactIndex'), nav: true, name: 'contact', icon: 'icon-envelope-alt'},
                { route: 'language', title: this.currentTranslationData.routes.language, nav: true, name: 'language', icon: ' icon-flag'},
                { route: 'user', title: this.currentTranslationData.routes.user, nav: true, name: 'user', icon: 'icon-user'},
                { route: 'sign/signOut', title: this.currentTranslationData.routes.signOut, moduleId: viewHelper.convertModuleNameToModuleId('signOut'), nav: true, icon: 'icon-signout'},
            ];

            router.activeInstruction.subscribe(function (newValue) {
                if (newValue.config.moduleId === this.routes[1].moduleId) {
                    this.isUserLogged(false);
                } else {
                    if (this.isUserLogged() === false && !_.isNull(backEndConfig.currentUser)) {
                        this.isUserLogged(true);
                    }
                }
            }, this);

            this.activate = function () {
                this.addSubRoutes();

                router.map(this.routes).buildNavigationModel();

                return router.activate();
            };

            this.attached = function () {
                var controllerName = {name: ''};
                viewHelper.convertModuleIdToModuleName(router.activeInstruction().config.moduleId, controllerName);

                _.each(router.navigationModel(), function (item) {
                    if (controllerName.name == item.name) {
                        item.isActive(true);
                        item.expandedSubMenu(true);
                        return true;
                    }
                });
            };

            this.addSubRoutes = function () {
                var i, route, activeSubRoutes,
                    subRoutes = [];

                for (i = 0; i < this.routes.length; i++) {
                    this.routes[i].settings = this.mapSubNav(this.routes[i].name);
                    this.routes[i].expandedSubMenu = ko.observable(false);

                    subRoutes.push(this.routes[i].settings.subRoutes);

                    activeSubRoutes = _.filter(this.routes[i].settings.subRoutes, function (data) {
                        return data.show === true;
                    });

                    this.routes[i].activeSubRoutes = activeSubRoutes.length;
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

            this.menuItemClicked = function () {
                if (this.settings.subRoutes.length === 0) {
                    that.collapseAllSubMenus();
                    this.isActive(true);
                    router.navigate(this.hash);
                } else {
                    that.expandSubMenu.call(this);
                }
            };

            this.subMenuItemClicked = function (currentItem, parent) {
                that.collapseAllSubMenus();

                parent.isActive(true);
                parent.expandedSubMenu(true);
                router.navigate(currentItem.hash);
            };

            this.collapseAllSubMenus = function () {
                _.each(router.navigationModel(), function (item) {
                    item.isActive(false);
                    item.expandedSubMenu(false);
                });
            };

            this.changeLanguage = function () {
                http.post('user/changeLanguage', {id: backEndConfig.currentUser.id, lang_id: this.id}).then(function(response) {
                    if (response.result === true) {
                        location.reload();
                    }
                });
            };
        };

        Shell.prototype = new ShellController();

        return new Shell();
    }
);