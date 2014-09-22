define(['plugins/http', 'durandal/app', 'knockout', 'controllers/UserController', 'plugins/router'],
    function (http, app, ko, UserController, router) {
    "use strict";

    function UserShow () {
        var that = this;

        this.userData =  ko.observableArray([]);

        this.activate = function (userId) {
            var that = this;

            var promise = http.get('User/show/', {id: userId}).then(function(response) {
                that.userData.push(response.user);
            });

            this.setTranslationData();

            return promise;
        };

        this.destroy = function (){
            var confirmDeletion = confirm(that.currentTranslationData.confirmDeletion);

            if (confirmDeletion){
                http.post('user/destroy', {id: this.id}).then(function () {
                    router.navigate('user/index');
                });
            }
        };

        this.edit = function () {
            router.navigate('user/edit/' + this.id);
        }
    }

        UserShow.prototype = new UserController();

    return UserShow;
});