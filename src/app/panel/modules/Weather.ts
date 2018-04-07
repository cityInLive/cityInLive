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


	public async get(panel: PanelComponent) {
		let o = this;
		this.requestFromName(this.MODULE_NAME, panel.cityName + "," + panel.cityRegion, function(data: any) {
			o.actual = new ActualData(data.actual.logo, data.actual.text, data.actual.temp);
			o.forecasts = []
			for(let forecast of data.forecast) {
				o.forecasts.push(new Forecast(forecast.logo, forecast.day, forecast.temp));
			}

		});
	}

}
