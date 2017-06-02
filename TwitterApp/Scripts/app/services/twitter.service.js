'use strict';

(function (ng) {
    ng.module('app').service('twitter.service',
        [
            '$http', '$q',
            function ($http, $q) {
                var service = {
                    getTweets: function (hash) {
                        return $http.get('/api/Twitter/GetTweets', { params: { hash: hash } })
                            .then(function (response) {
                                return response.data;
                            }).catch(function (error) {
                                console.log(error);
                            });
                    }
                };

                return service;
            }
        ]);
})(angular)