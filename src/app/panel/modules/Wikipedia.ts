import { Module } from './Module';
import { Observable } from 'rxjs';
import { PanelComponent } from '../panel.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

export class CityInfo {
	public name:    string;
	public content: string;

	public constructor(name: string, content: string) {
		this.name    = name;
		this.content = content;
	}

}

export class Wikipedia extends Module {

	public MODULE_NAME = 'wikipedia';

	public imageURL:     string;
	public imageDesc:    string;
	public description:  string;
	public informations: CityInfo[];

	public get(panel: PanelComponent) {
		let o = this;
		this.requestFromName(this.MODULE_NAME, panel.cityName + "," + panel.cityRegion, function(data: any) {
			o.imageURL     = data.image.url;
			o.imageDesc    = data.image.desc;
			o.description  = data.desc;
			o.informations = o.ordered(data.info);
		});
	}

	public ordered(value: any) {
		let res = [];

		this.addInfo(res, "région", value);
		this.addInfo(res, "département", value);
		this.addInfo(res, "maire", value);
		this.addInfo(res, "cp", value, "Code postal");
		this.addInfo(res, "population", value);
		this.addInfo(res, "population agglomération", value);
		this.addInfo(res, "superficie", value);

		return res;
	}

	public addInfo(res, name :string, values, newName = name) {
		if(values.hasOwnProperty(name)) {
			res.push(new CityInfo(newName, values[name]));
		}
	}


}
