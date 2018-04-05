import { Module } from './Module';
import { PanelComponent } from '../panel.component';


export class Wikipedia extends Module {

	public MODULE_NAME = 'wiki';

	public imageURL:     string;
	public imageDesc:    string;
	public description:  string;
	public informations: string;

	public get(panel: PanelComponent) {
		this.requestFromName(this.MODULE_NAME, panel.cityName).subscribe(data => {
			let value = data.json();
			console.log(value);
			this.description = value.summary;
		});
	}

}
