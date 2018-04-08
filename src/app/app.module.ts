import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router' ;


// Google Maps
import { AgmCoreModule } from '@agm/core';

// Smooth scroll
import { SimpleSmoothScrollModule } from 'ng2-simple-smooth-scroll';

// URLs to links
import { LinkyModule } from 'angular-linky';

// Events when div resizes
import { BoundSensorModule } from 'angular-bound-sensor';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { PanelComponent } from './panel/panel.component';


@NgModule({
  imports: [
    BrowserModule,
	CommonModule,
	FormsModule,
	SimpleSmoothScrollModule,
	HttpModule,
	LinkyModule,
	BoundSensorModule,
	RouterModule,
	AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCjd71SfnccCzf95_eYf9eTzOOvr2d2Xyg',
	  libraries: ["places"]
  	}),
	RouterModule.forRoot([
		{ path: "", component: AppComponent},
		{ path: "index", component: PanelComponent},
		{ path: "module", component: PanelComponent}
	])
  ],
  declarations: [
	AppComponent,
	SearchComponent,
	PanelComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
