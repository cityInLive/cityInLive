import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { SimpleSmoothScrollService, SimpleSmoothScrollOption } from 'ng2-simple-smooth-scroll';
import { Http, Response } from '@angular/http';
import { ElementRef, ViewChild } from '@angular/core';


import { Wikipedia } from './modules/Wikipedia';
import { Weather } from './modules/Weather';
import { Twitter } from './modules/Twitter';


@Component({
	selector: 'app-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.css']
})

export class PanelComponent implements OnInit {

	public cityName:   string;
	public cityRegion: string;
	public lat:        number;
	public lng:        number;
	public showPanel:  boolean;
	public fixedBar:   boolean;

	public weather:   Weather;
	public wikipedia: Wikipedia;
	public twitter:   Twitter;

	public wikipediaH: number;

	public constructor(
		private smooth: SimpleSmoothScrollService,
		private zone: NgZone,
		private http: Http
		) {
			this.wikipedia  = new Wikipedia(http);
			this.weather    = new Weather(http);
			this.twitter    = new Twitter(http);
			this.wikipediaH = 0;
	}

	@HostListener('resize', ['$event'])
	public onResize(event) {
		this.wikipediaH = event.detail.height;
	}

	public ngOnInit() {
		this.showPanel = false;
		this.fixedBar  = false;
		this.debug();
	}

	@HostListener('window:scroll', [])
	public onWindowScroll() {
		if(this.showPanel) {
			let panelAreaPos = document.getElementById('module-area').getBoundingClientRect();
			if(panelAreaPos.top < 40) {
				if(!this.fixedBar)
					this.fixedBar = true;
			}
			else {
				if(this.fixedBar)
					this.fixedBar = false;
			}
		}
	}

	public debug() {
		this.showCity("Paris", 48.86666, 2.333333, "Île-De-France");
	}

	public showCity(cityName: string, lat: number, lng: number, cityRegion: string) {
		this.cityName   = cityName;
		this.lat        = lat;
		this.lng        = lng;
		this.showPanel  = true;
		this.cityRegion = cityRegion;
		this.getModulesInfos();
		this.scroll();
	}

	public returnSearch() {
		//this.showPanel = false;
		this.smooth.smoothScrollToTop();
	}

	public getModulesInfos() {
		this.twitter.get(this);
		this.wikipedia.get(this);
		this.weather.get(this);

		//this.weather.get(this);
		//this.twitter.get(this);
	}

	public scroll() {
		window.location.hash = "#SimpleSmoothScroll";
		this.smooth.smoothScrollToAnchor();
		//window.location.hash = "";
		//document.getElementById("SimpleSmoothScroll").scrollIntoView();
	}

}
