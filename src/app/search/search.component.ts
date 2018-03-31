import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

	public latitude:   number;
	public longitude:  number;
	public zoom:       number;
	public cityName:   string;
	public allowVisit: boolean;


	@ViewChild("search")
	public searchElementRef: ElementRef;

	public constructor(
		private mapsAPILoader: MapsAPILoader,
		private zone: NgZone
		) {
			this.latitude   = 39.8282;
			this.longitude  = -98.5795;
			this.allowVisit = false;
	}

	public ngOnInit() {
		this.mapsAPILoader.load().then(() => {

			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				types: ["(cities)"]
			});

			autocomplete.addListener("place_changed", () => {
				this.zone.run(() => {
					this.cityName = autocomplete.getPlace().formatted_address;
					this.onSearch();
				});
			});

			this.showCountry('France');
		});
	}

	public onUpdateCity() {
		this.cityName = this.cityName.replace(/(^|\s)\S/g, function(l) {
			return l.toUpperCase();
		});
		this.allowVisit = false;
	}

	public onSearch() {
		this.showCity(this.cityName);
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
				let location = results[0].geometry.location;
				let types    = results[0].address_components[0].types;

				if(types.includes(placeType)) {

					search.zone.run(() => {
						search.latitude  = location.lat();
						search.longitude = location.lng();

						if(shouldAllowVisit) {
							search.allowVisit = true;
						}
					});

					//$scope.map.setCenter(results[0].geometry.location);
					//$scope.map.fitBounds(results[0].geometry.viewport);

				}
			}
		});
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
