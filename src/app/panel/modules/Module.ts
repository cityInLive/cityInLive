import { PanelComponent } from '../panel.component';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

export abstract class Module {

	public BASE_URL = "https://livecity.vlntn.pw:8080/";

	public constructor(public http: Http) {

	}

	public requestURL(url: string, execute: any) {
		return this.http
			.get(url)
			.subscribe(
				data  => execute(data.json()),
				error => this.showError(error)
		);
	}

	public requestFromName(apiName :string, cityName: string, execute: any) {
		return this.requestURL(this.BASE_URL + apiName + '/' + cityName, execute);
	}

	public requestFromPos(apiName :string, lat: number, lng: number, execute: any) {
		return this.requestURL(this.BASE_URL + apiName + '/' + lat + ',' + lng, execute);
	}

	public showError(error: string) {
		console.log("A server error has occured", error);
	}

	public abstract get(panel: PanelComponent);

}
