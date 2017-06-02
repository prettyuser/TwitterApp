'use strict';

(function (ng) {
    ng.module('app').controller('root.controller',
        [
            '$scope', '$rootScope', 'twitter.service',
            function ($scope, $rootScope, twitter$) {
                $scope.view = {
                    loading: false,
                    fetching: false,
                    text: '',
                    min: 2
                };
                $scope.model = { tweets: [] };
                $scope.actions = {
                    change: function () {
                        if (($scope.view.text || '').length < $scope.view.min) return;

                        $scope.view.fetching = true;

                        twitter$.getTweets($scope.view.text)
                            .then(function (data) {
                                $scope.model.tweets = data;
                                $scope.view.fetching = false;
                            });
                    },
                    remove: function (tweet, index) {
                        $scope.model.tweets = $scope.model.tweets.filter(function (_, i) {
                            return i !== index;
                        });
                    },
                    removeAll: function () {
                        $scope.model.tweets = [];
                    },
                    clear: function() {
                        $scope.view.text = '';
                    },
                    reset: function () {
                        $scope.view.text = '';
                        $scope.model.tweets = [];
                    }
                };

                $scope.view.loading = false;
            }
        ]);
})(angular);
