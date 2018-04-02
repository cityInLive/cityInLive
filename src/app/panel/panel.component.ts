import { Component, OnInit, NgZone } from '@angular/core';
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

	public constructor(
		private smooth: SimpleSmoothScrollService,
		private zone: NgZone
		) {

	}

	public ngOnInit() {
		this.showPanel = false;
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
		window.location.hash = "";
	}

}
