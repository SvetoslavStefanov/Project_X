define(['plugins/http', 'durandal/app', 'knockout', 'controllers/projectController', 'plugins/router'],
    function (http, app, ko, projectController, router) {
        "use strict";

        var actionBoxStatusClasses = {
            created: 'success',
            destroyed: 'danger'
        };

        return projectController(new function () {
            this.projects = ko.observableArray([]);
            this.actionMessage = ko.observable('');
            this.actionBoxClassName = ko.observable('');

            this.actionMessage.subscribe(function (newValue) {
                var that = this;
                if (newValue.length > 0 ){
                    setTimeout(function (){
                        that.actionMessage('');
                    }, 3000);
                }
            }, this);

            this.activate = function (action) {
                var that = this;

                http.get('admin/Project/index').then(function (response) {
                    that.projects(response.projects);
                });

                if (!_.isUndefined(action)) {
                    switch (action) {
                        case 'created':
                            this.actionMessage('Направихте нов проект');
                            break;
                        case 'destroyed':
                            this.actionMessage('Изтрихте проекта');
                            break;
                    }

                    if (!_.isUndefined(actionBoxStatusClasses[action])) {
                        this.actionBoxClassName(actionBoxStatusClasses[action]);
                    }
                }
            };

            this.navigateToProjectShow = function (project) {
                router.navigate('project/show/' + project.id);
            };
        });
    });