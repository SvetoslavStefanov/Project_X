define(['plugins/http', 'knockout', 'controllers/SignController', 'plugins/router'],
    function (http, ko, SignController, router) {
        "use strict";

        function SignIn() {
            this.username = ko.observable();
            this.password = ko.observable();

            this.activate = function () {
                http.get('Sign/login').then(function (response) {
                    if (response.isUserLogged === true) {
                        router.navigate('');
                    }
                });

                this.setTranslationData();
            };

            this.makeRequest = function () {
                var that = this,
                    params = {
                        username: that.username(),
                        password: that.password()};

                http.post('Sign/login', params).then(function (response) {
                    router.navigate('');
                }).fail(function (data) {
                    alert("Wrong name or pass")
                });
            };

        };

        SignIn.prototype = new SignController();

        return SignIn;
    });