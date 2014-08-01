define(['plugins/http', 'durandal/app', 'knockout', 'controllers/ProjectController', 'plugins/router'],
    function (http, app, ko, ProjectController, router) {
        "use strict";

        var actionBoxStatusClasses = {
            created: 'success',
            destroyed: 'danger'
        };

        function ProjectIndex() {
            this.projects = ko.observableArray([]);
            this.actionMessage = ko.observable('');
            this.actionBoxClassName = ko.observable('');

            this.actionMessage.subscribe(function (newValue) {
                var that = this;
                if (newValue.length > 0) {
                    setTimeout(function () {
                        that.actionMessage('');
                        router.navigate('', { replace: true, trigger: false });
                    }, 4000);
                }
            }, this);

            this.activate = function (action) {
                var that = this,
                    promise = $.Deferred();

                http.get('Project/index').then(function (response) {
                    that.projects(response.projects);
                    promise.resolve();
                }).fail(function () {
                    promise.resolve();
                });

                this.setTranslationData();

                if (!_.isUndefined(action)) {
                    switch (action) {
                        case 'created':
                            this.actionMessage(this.currentTranslationData.actionMessage.created);
                            break;
                        case 'destroyed':
                            this.actionMessage(this.currentTranslationData.actionMessage.destroyed);
                            break;
                    }

                    if (!_.isUndefined(actionBoxStatusClasses[action])) {
                        this.actionBoxClassName(actionBoxStatusClasses[action]);
                    }
                }

                return promise;
            };

            this.navigateToProjectShow = function (project) {
                router.navigate('project/show/' + project.id);
            };
        };

        ProjectIndex.prototype = new ProjectController();

        return new ProjectIndex();
    });