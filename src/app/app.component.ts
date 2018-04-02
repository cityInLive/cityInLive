import { Component, ViewChild } from '@angular/core';
import { PanelComponent } from './panel/panel.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	@ViewChild(PanelComponent) panel:PanelComponent;

	public getPanel() {
		return this.panel;
	}

}
