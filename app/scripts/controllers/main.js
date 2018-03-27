'use strict';

/*
let app = angular.module('liveCityApp', []);

app.controller('MainCtrl', function($scope) {
	$scope.total = 'world';
});
*/

let app = angular.module('liveCityApp');

app.controller('mainCtrl', ['$scope', function($scope) {
	$scope.total = 'hello';
}]);
