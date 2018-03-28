'use strict';


angular.module('liveCityApp').controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.allowVisit = true;
	$scope.city = "";

	$scope.change = function() {
		console.log("on change: " + $scope.city);
		//$scope.$apply();
		$scope.allowVisit = false;
		$scope.toMajs();
	};



	$scope.setValue = function(newValue) {

		console.log("on set: " + newValue);
		$scope.$apply(function () {
			$scope.city = newValue;
		});
		$scope.$digest();
		$scope.change();
	};

	$scope.toMajs = function() {
		console.log("on maj");
		$scope.city = $scope.city.replace(/(^|\s)\S/g, function(l) {
			return l.toUpperCase();
		});
		//city.name = city.name.replace(', France','');
	};

	$scope.search = function() {
		console.log("on cherche" + $scope.city);
		showLocation($scope.city);
	};


	$scope.visit = function() {

	};


	$scope.havePanel = function() {
		return false;
	};


	$scope.initialize = function() {
		createMap(1);
		showCountry('France');
	};

	google.maps.event.addDomListener(window, 'load', $scope.initialize);

	function showPlace(placeName, placeType, shouldAllowVisit) {
		let geocoder = new google.maps.Geocoder();

		geocoder.geocode({'address': placeName}, function(results, status) {
			if(status === google.maps.GeocoderStatus.OK) {
				console.log("resultat de la recherhce pour " + placeName + ":");
				console.log(results);
				let location = results[0].geometry.location;
				let types    = results[0].address_components[0].types;

				if(types.includes(placeType)) {
					let lat = location.lat();
					let lng = location.lng();

					$scope.pos = {lat: lat, lng: lng};

					$scope.map.setCenter(results[0].geometry.location);
					$scope.map.fitBounds(results[0].geometry.viewport);

					if(shouldAllowVisit) {
						$scope.allowVisit = true;
						$scope.$apply();
					}
				}
			}
		});
	}

	function showCountry(countryName) {
		showPlace(countryName, 'country', false);
	}

	function showLocation(cityName) {
		showPlace(cityName, 'locality', true);
	}

	function createMap(zoomValue) {
		if($scope.map === undefined) {
			$scope.map = new google.maps.Map(document.getElementById('map'), {
				zoom: zoomValue,
				disableDefaultUI: true,
				styles: googleMapsStyle()
			});

			var input = document.getElementById('input-city');

			var options = {
				types: ['(cities)'],
				componentRestrictions: {country: 'fr'}
			};

			var autocomplete = new google.maps.places.Autocomplete(input, options);
			//autocomplete.bindTo('bounds', map);


			autocomplete.addListener('place_changed', function() {
				var place = autocomplete.getPlace();
				var location = place.address_components[0].short_name;
				//console.log("Autocomplete:" + place.address_components[0].short_name);
				console.log('on a changé de place: ' + location);
				//$scope.city = "ksdjl^sd^sfqjg^sjgks,fmg";
				//$scope.$apply();
				$scope.setValue(location);
				$scope.search();
				$scope.allowVisit = true;
				///$scope.$apply();
				//$scope.search();

				//$scope.city = place.address_components[0].short_name;
				//$scope.setValue(place.address_components[0].short_name);
				//$scope.change();
				//$scope.search();
				//$scope.$apply(function() {
                    //$scope.city.$setViewValue("input.val()");
				//	console.log($scope.ngModel);
                //});
				//console.log(place);
				//console.log($scope);
				//console.log(place.address_components[0].short_name);
				//$scope.city = "LSDLFJSLJFSDF";//place.address_components[0].short_name;
				//$scope.$apply();
				//$scope.search();
				//$scope.toMajs($scope.city);
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
						"visibility": "on"
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
