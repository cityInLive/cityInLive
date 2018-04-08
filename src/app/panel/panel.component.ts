import { Component, OnInit, NgZone, HostListener, ChangeDetectorRef } from '@angular/core';
import { SimpleSmoothScrollService, SimpleSmoothScrollOption } from 'ng2-simple-smooth-scroll';
import { Http, Response } from '@angular/http';
import { ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


import { Wikipedia } from './modules/Wikipedia';
import { Weather } from './modules/Weather';
import { Twitter } from './modules/Twitter';
import { Instagram } from './modules/Instagram';


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
	public bounds:     any;
	public showPanel:  boolean;

	public weather:   Weather;
	public wikipedia: Wikipedia;
	public twitter:   Twitter;
	public instagram: Instagram;

	public wikipediaH: number;
	public instagramH: number;
	public mapH :number;
	public mapW :number;

	@ViewChild('wikipediaM') wikipediaM: ElementRef;
	@ViewChild('cinemaM') cinemaM:       ElementRef;
	@ViewChild('mapM') mapM:             ElementRef;
	@ViewChild('weatherM') weatherM:     ElementRef;

	public makeItBug: string;

	public constructor(
		private smooth: SimpleSmoothScrollService,
		private zone: NgZone,
		private http: Http,
		public cd : ChangeDetectorRef,
		public router: Router
		) {
			this.wikipedia  = new Wikipedia(http);
			this.weather    = new Weather(http);
			this.twitter    = new Twitter(http);
			this.instagram  = new Instagram(http);
			this.wikipediaH = 0;
			this.instagramH = 0;
			this.makeItBug  = "";
	}

	@HostListener('resize', ['$event'])
	public onResize(event) {
		console.log("GOOOOOD");
		console.log(event.detail);
		this.makeItBug  = "";
		this.wikipediaH = event.detail.height;
		this.instagramH = this.weatherM.nativeElement.offsetHeight + this.mapM.nativeElement.offsetHeight + 8;
	}

	public rerender() {/*
		if (this.router.navigated === false) {
    // Case when route was not used yet
    this.router.navigateByUrl(`/module`);
  } else {
    // Case when route was used once or more
    this.router.navigateByUrl(`/index`).then(
      () => {
        this.router.navigateByUrl(`/module`);
	});
}*/window.location.reload();
	}

	public ngOnInit() {
		this.showPanel = false;
		//this.debug();
	}

	public debug() {
		this.showCity("Paris", 48.86666, 2.333333, "Île-De-France", null);
	}

	public showCity(cityName: string, lat: number, lng: number, cityRegion: string, bounds: any) {
		this.cityName   = cityName;
		this.lat        = lat;
		this.lng        = lng;
		this.bounds     = bounds;
		this.showPanel  = true;
		this.cityRegion = cityRegion;
		this.getModulesInfos();
		this.scroll();
	}

	public returnSearch() {
		this.smooth.smoothScrollToTop();
	}

	public getModulesInfos() {
		this.twitter.get(this);
		this.wikipedia.get(this);
		this.weather.get(this);
		this.instagram.get(this);
	}

	public scroll() {
		window.location.hash = "#SimpleSmoothScroll";
		this.smooth.smoothScrollToAnchor();



		//window.location.hash = "";
		//document.getElementById("SimpleSmoothScroll").scrollIntoView();
	}

}
