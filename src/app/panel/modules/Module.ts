import { PanelComponent } from '../panel.component';

import { Http, Response } from '@angular/http';

export abstract class Module {

	public BASE_URL = "https://livecity.vlntn.pw:8080/";

	public constructor(public http: Http) {

	}

	public requestFromName(apiName :string, cityName: string) {
		return this.http.get(this.BASE_URL + apiName + '/' + cityName);
	}

	public abstract get(panel: PanelComponent);

}
