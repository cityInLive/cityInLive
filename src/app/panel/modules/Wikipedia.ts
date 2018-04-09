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

	public async get(panel: PanelComponent) {
		let o = this;

		o.imageURL = "";
		o.imageDesc = "";
		o.description = "";

		this.requestFromName(this.MODULE_NAME, panel.cityName + "," + panel.cityRegion, function(data: any) {
			o.imageURL     = data.image.url;
			o.imageDesc    = data.image.desc;
			o.description  = data.desc;
			o.informations = o.ordered(data.info);

			panel.wikipediaH = panel.wikipediaM.nativeElement.offsetHeight;
		});
		//panel.wikipediaH = 0;
		//panel.makeItBug  = "CHARGEMENT\n".repeat(1000);
	//	let old = panel.wikipediaM.nativeElement.style.innerHTML;
	//	panel.wikipediaM.nativeElement.style.innerText = "dfsf";
//		panel.wikipediaM.nativeElement.dispatchEvent(new Event('resize'));

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
