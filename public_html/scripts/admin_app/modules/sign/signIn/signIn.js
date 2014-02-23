define(['plugins/http', 'knockout', 'controllers/signInController', 'plugins/router'],
    function (http, ko, signInController, router) {
        "use strict";

        return signInController({
            username: ko.observable(),
            password: ko.observable(),

            activate: function () {
                http.get('admin/Sign/in').then(function (response) {
                    if (response.isUserLogged === true) {
                        router.navigate('');
                    }
                });

            },
            makeRequest: function () {
                var that = this,
                    params = {
                        username: that.username(),
                        password: that.password()};

                http.post('admin/Sign/login', params).then(function (response) {
                    router.navigate('');
                }).fail(function (data) {
                        alert("Wrong name or pass")
                    });
            }

        });
    });