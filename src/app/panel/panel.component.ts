import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';
import { SimpleSmoothScrollOption } from 'ng2-simple-smooth-scroll';
import { Http, Response } from '@angular/http';

import { Wikipedia } from './modules/Wikipedia';
import { Weather } from './modules/Weather';

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

	public constructor(
		private smooth: SimpleSmoothScrollService,
		private zone: NgZone,
		private http: Http
		) {
			this.wikipedia = new Wikipedia(http);
			this.weather   = new Weather(http);

	}

	public ngOnInit() {
		this.showPanel = false;
		this.fixedBar  = false;
		this.debug();
	}

	@HostListener('window:scroll', [])
	public onWindowScroll() {
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

	public getModulesInfos() {
		this.wikipedia.get(this);
		this.weather.get(this);
	}

	public scroll() {
		window.location.hash = "#SimpleSmoothScroll";
		this.smooth.smoothScrollToAnchor();
		//window.location.hash = "";
		//document.getElementById("SimpleSmoothScroll").scrollIntoView();
	}

}
