'use strict';


angular.module('liveCityApp').controller('mainCtrl', ['$scope', function($scope) {
	$scope.text = 'hello';

	//$scope.city.name = 'test';

	$scope.update = function(city) {
		$scope.text = 'Text: ' + city.name;
	};

}]);
