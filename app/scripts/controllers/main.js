'use strict';


angular.module('liveCityApp').controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.allowVisit = false;

	$scope.change = function() {
		$scope.allowVisit = false;
		$scope.toMajs($scope.city);
	};

	$scope.toMajs = function(city) {
		city.name = city.name.replace(/(^|\s)\S/g, function(l) {
			return l.toUpperCase();
		});
	};

	$scope.search = function(city) {
		showLocation(city.name);
	};


	$scope.visit = function(city) {

	};


	$scope.havePanel = function() {
		return false;
	};


	$scope.initialize = function() {
		let france = {lat: 47.7510112, lng: 2.3148873};
		createMap(france, 6);
	};
	google.maps.event.addDomListener(window, 'load', $scope.initialize);


	function showLocation(cityName) {
		let geocoder = new google.maps.Geocoder();

		geocoder.geocode({'address': cityName}, function(results, status) {
			if(status === google.maps.GeocoderStatus.OK) {
				console.log(results);
				let location = results[0]["geometry"]["location"];
				let types    = results[0]["address_components"][0]["types"];

				if(types.includes('locality')) {
					let lat = location.lat();
					let lng = location.lng();
					$scope.pos = {lat: lat, lng: lng};
					$scope.map.setCenter(results[0]["geometry"].location);
					$scope.map.fitBounds(results[0]["geometry"].viewport);

					$scope.allowVisit = true;
					$scope.$apply();
				}
			}
		});
	}

	function createMap(centerPos, zoomValue) {
		if($scope.map === undefined) {
			$scope.map = new google.maps.Map(document.getElementById('map'), {
				zoom: zoomValue,
				disableDefaultUI: true,
				center: centerPos,
				styles: googleMapsStyle()
			});
		}
	}

	function googleMapsStyle() {
		return [
			{
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#f5f5f5"
					}
				]
			},
			{
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#f5f5f5"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#bdbdbd"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "poi.medical",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#dadada"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "road.local",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "transit.line",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#c9c9c9"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			}
		];
	}

}]);
