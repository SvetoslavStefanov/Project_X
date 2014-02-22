define(['plugins/http', 'durandal/app', 'knockout', 'helper/DialogHelper', 'controllers/signInController','plugins/router'], function (http, app, ko, DialogHelper,signInController,router) {
    "use strict";
    return signInController({
        username: ko.observable(),
        password: ko.observable(),
        activate: function () {
        	http.get('admin/Sign/in').then(function(response) {
        		if(response.isUserLogged === true) {
        			router.navigate('');
        		}
        	});

        },
        makeRequest:function() {
        	var that = this;
        	http.post('admin/Sign/login',{username:that.username(),password:that.password()}).then(function(response) {
        		router.navigate('');
        	}).fail(function(data) {
                alert("Wrong name or pass")
            });
		}

    });
});