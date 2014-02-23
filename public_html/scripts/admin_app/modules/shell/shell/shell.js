define(['plugins/router', 'helper/viewHelper', 'knockout', 'plugins/http', 'durandal/app', ], function (router, viewHelper, ko, http, app) {
    return {
        router: router,
        searchString: ko.observable(),
        search: function () {
            var that = this;
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.

            http.get('admin/Project/search/' + that.searchString()).then(function (response) {

                // if(JSON.parse(response).length == 0) {
                //     app.showMessage('There is no results for '+that.searchString());
                // } else {
                app.trigger("searchUpdate", response);
                // }
            });
        },
        activate: function () {
            router.map([
                { route: '', title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectIndex'), nav: true},
                { route: 'project/show/:id', title: 'Проекти', moduleId: viewHelper.convertModuleNameToModuleId('projectShow'), nav: false},
                { route: 'sign/signIn', title: 'Sign In', moduleId: viewHelper.convertModuleNameToModuleId('signIn'), nav: false}
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});