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
                var i, inputs = document.getElementById('module_signIn').getElementsByTagName('input');

                for (i = 0; i < inputs.length; i++) {
                    if (inputs[i].type === 'text') {
                        this.username(inputs[i].value);
                    }

                    if (inputs[i].type === 'password') {
                        this.password(inputs[i].value);
                    }
                }

                var params = {
                    username: this.username(),
                    password: this.password()
                };

                http.post('Sign/login', params).then(function (response) {
                    backEndConfig.currentUser = response.currentUser;
                    router.navigate('');
                }).fail(function (data) {
                        alert("Wrong name or pass")
                    });
            };

        };

        SignIn.prototype = new SignController();

        return SignIn;
    });