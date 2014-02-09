define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    testingWidget = function (){
        "use strict";

        this.attached = function () {
            var that = this;

            http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: 'mount ranier', tagmode: 'any', format: 'json' }, 'jsoncallback').then(function(response) {
                for (var i in response.items){
                    response.items[i]['templateName'] = 'tableRowBlue';

                    if (i % 2 === 0){
                        response.items[i]['templateName'] = 'tableRowRed';
                    }
                }

                that.images(response.items);
            });
        };

        this.displayName = 'Table widget';

        this.images = ko.observableArray([]);
    }

    return new testingWidget();
});