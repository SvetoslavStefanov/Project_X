/**
 * Durandal 2.0.1 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
 * Available via the MIT license.
 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
 */
/**
 * Enables common http request scenarios.
 * @module http
 * @requires jquery
 * @requires knockout
 */
define(['knockout', 'plugins/router', 'durandal/app'], function (ko, router, app) {
    /**
     * @class HTTPModule
     * @static
     */
    function errorsBehavior(data) {
        if (!_.isUndefined(data.status)) {
            switch (data.status) {
                case 401:
                    router.navigate('sign/signIn');
                    break;
                case 550:
//                    router.navigateBack();
                    app.trigger('no_permission');
                    break;
            }
        }
    }

    return {
        /**
         * The name of the callback parameter to inject into jsonp requests by default.
         * @property {string} callbackParam
         * @default callback
         */
        callbackParam: 'callback',
        /**
         * Makes an HTTP GET request.
         * @method get
         * @param {string} url The url to send the get request to.
         * @param {object} [query] An optional key/value object to transform into query string parameters.
         * @return {Promise} A promise of the get response data.
         */
        get: function (url, query, options) {
            if (backEndConfig.config.isInAdmin === true) {
                url = backEndConfig.config.adminPrefix + "/" + url;
            }

            var ajaxConfig = {
                data: query,
                contentType: 'application/json',
                dataType: 'json'
            };

            if (!_.isUndefined(options)) {
                ajaxConfig = ko.utils.extend(ajaxConfig, options);
            }

            var promise = $.ajax(url, ajaxConfig);

            promise.fail(errorsBehavior);

            return promise;
        },
        /**
         * Makes an JSONP request.
         * @method jsonp
         * @param {string} url The url to send the get request to.
         * @param {object} [query] An optional key/value object to transform into query string parameters.
         * @param {string} [callbackParam] The name of the callback parameter the api expects (overrides the default callbackParam).
         * @return {Promise} A promise of the response data.
         */
        jsonp: function (url, query, callbackParam) {
            if (url.indexOf('=?') == -1) {
                callbackParam = callbackParam || this.callbackParam;

                if (url.indexOf('?') == -1) {
                    url += '?';
                } else {
                    url += '&';
                }

                url += callbackParam + '=?';
            }

            return $.ajax({
                url: url,
                dataType: 'jsonp',
                data: query
            });
        },
        /**
         * Makes an HTTP POST request.
         * @method post
         * @param {string} url The url to send the post request to.
         * @param {object} data The data to post. It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
         * @return {Promise} A promise of the response data.
         */
        post: function (url, data, options) {
            if (backEndConfig.config.isInAdmin === true) {
                url = backEndConfig.config.adminPrefix + "/" + url;
            }

            var ajaxConfig = {
                url: url,
                data: data,
                type: 'POST',
                dataType: 'json'
            };

            if (!_.isUndefined(options)) {
                ajaxConfig = ko.utils.extend(ajaxConfig, options);
            }

            var promise = $.ajax(ajaxConfig);

            promise.fail(errorsBehavior);

            return promise;
        }
    };
});
