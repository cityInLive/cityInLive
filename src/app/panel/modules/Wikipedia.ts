import { Module } from './Module';
import { PanelComponent } from '../panel.component';

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
		this.requestFromName(this.MODULE_NAME, panel.cityName).subscribe(data => {
			let value = data.json();
			console.log(value);
			if(!value.hasOwnProperty('Error')) {
				this.imageURL  = value.image.url;
				this.imageDesc = value.image.desc;
				this.description = value.desc;
				this.informations = this.ordered(value.info);
			}
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
