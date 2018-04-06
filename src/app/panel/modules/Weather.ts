import { Module } from './Module';
import { PanelComponent } from '../panel.component';

export class Data {
	public image: string;
	public temp:  number;

	public constructor(image: string, temp: number) {
		this.image = 'assets/images/weather/' + image + '.png';
		this.temp  = temp;
	}
}

export class Forecast extends Data {
	public date:  string;

	public constructor(image: string, date: string, temp: number) {
		super(image, temp);
		this.date = date;
	}
}

export class ActualData extends Data {
	public desc:  string;

	public constructor(image: string, desc: string, temp: number) {
		super(image, temp);
		this.desc  = desc;
	}
}

export class Weather extends Module {

	public MODULE_NAME = 'weather';

	public actual: ActualData;
	public forecasts: Forecast[];


	public get(panel: PanelComponent) {
		this.requestFromName(this.MODULE_NAME, panel.cityName).subscribe(data => {
			let value = data.json();
			console.log(value);
			if(!value.hasOwnProperty('Error')) {
				this.actual = new ActualData('01d', 'Ciel dégagé', 16.49);

				this.forecasts = [];
				this.forecasts.push(new Forecast('01d', 'Samedi',   17));
				this.forecasts.push(new Forecast('02d', 'Dimanche', 18));
				this.forecasts.push(new Forecast('03d', 'Lundi',    19));

			}
		});
	}

}
