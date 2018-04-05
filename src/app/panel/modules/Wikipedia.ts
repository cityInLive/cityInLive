import { Module } from './Module';
import { PanelComponent } from '../panel.component';


export class Wikipedia extends Module {

	public get(panel: PanelComponent) {
		console.log('get');
	}

}
