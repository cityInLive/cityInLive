'use strict';


angular.module('liveCityApp').controller('mainCtrl', ['$scope', function($scope) {
	$scope.text = 'hello';

	//$scope.city.name = 'test';

	$scope.update = function(city) {
		$scope.text = 'Text: ' + city.name;
	};


}]);

function initMap() {
	var uluru = {lat: 47.7510112, lng: 2.3148873};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 6,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}
