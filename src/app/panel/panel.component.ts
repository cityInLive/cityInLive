import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';
import { SimpleSmoothScrollOption } from 'ng2-simple-smooth-scroll';

@Component({
	selector: 'app-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.css']
})

export class PanelComponent implements OnInit {

	public cityName:  string;
	public lat:       number;
	public lng:       number;
	public showPanel: boolean;
	public fixedBar:  boolean;

	public constructor(
		private smooth: SimpleSmoothScrollService,
		private zone: NgZone
		) {
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
		this.showCity("Paris", 48.86666, 2.333333);
	}

	public showCity(cityName: string, lat: number, lng: number) {
		this.cityName  = cityName;
		this.lat       = lat;
		this.lng       = lng;
		this.showPanel = true;
		this.scroll();
	}

	public scroll() {
		window.location.hash = "#SimpleSmoothScroll";
		this.smooth.smoothScrollToAnchor();
		//window.location.hash = "";
		//document.getElementById("SimpleSmoothScroll").scrollIntoView();
	}

}
