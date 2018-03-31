import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css', './googlemaps.css']
})

export class SearchComponent implements OnInit {

	public latitude:   number;
	public longitude:  number;
	public zoom:       number;
	public cityName:   string;
	public oldCity:    string;
	public allowVisit: boolean;
	public bounds:     any;
	public googleMapsStyle: any;


	@ViewChild("search")
	public searchElementRef: ElementRef;

	public constructor(
		private mapsAPILoader: MapsAPILoader,
		private zone: NgZone
		) {
			this.latitude   = 39.8282;
			this.longitude  = -98.5795;
			this.allowVisit = false;
			this.googleMapsStyle = this.getGoogleMapsStyle();
	}

	public ngOnInit() {
		this.mapsAPILoader.load().then(() => {

			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				types: ["(cities)"],
				componentRestrictions: {country: 'fr'}
			});

			autocomplete.addListener("place_changed", () => {
				this.zone.run(() => {
					let city = autocomplete.getPlace().formatted_address;
					if(city != undefined)
						this.cityName = city;
					this.onSearch();
				});
			});

			this.showCountry('France');
		});
	}

	public onUpdateCity() {
		this.zone.run(() => {
			this.cityName = this.cityName.replace(/(^|\s)\S/g, function(l) {
				return l.toUpperCase();
			});
			this.allowVisit = false;

			if(this.oldCity == this.cityName)
				this.allowVisit = true;
		});
	}

	public onSearch() {
		if(this.cityName != this.oldCity) {
			this.showCity(this.cityName);
		}
		else {
			this.zone.run(() => {
				this.allowVisit = true;
			});
		}
	}

	public onVisit() {
		console.log('visit' + this.cityName);
	}

	public showCountry(country: string) {
		this.showPlace(country, 'country', false);
	}

	public showCity(city: string) {
		this.showPlace(city, 'locality', true);
	}

	public showPlace(address: string, placeType: string, shouldAllowVisit: boolean) {
		let geocoder = new google.maps.Geocoder();
		let search = this;

		geocoder.geocode({'address': address}, function(results, status) {

			if(status === google.maps.GeocoderStatus.OK) {
				let place    = results[0];
				let location = place.geometry.location;
				let types    = place.address_components[0].types;

				if(types.includes(placeType)) {
					search.zone.run(() => {
						search.latitude  = location.lat();
						search.longitude = location.lng();
						search.bounds    = place.geometry.viewport;
						search.oldCity   = address;

						if(shouldAllowVisit) {
							search.allowVisit = true;
						}
						return;
					});
				}
			}
		});

	}

	public getGoogleMapsStyle() {
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

	setMapPosition() {
		/*
		if ("geolocation" in navigator) {
			console.log(navigator.geolocation);
			navigator.geolocation.getCurrentPosition((position) => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				this.zoom = 12;
			});
		}*/
	}



}
