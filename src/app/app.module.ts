import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Google Maps
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { PanelComponent } from './panel/panel.component';


@NgModule({
  imports: [
    BrowserModule,
	CommonModule,
	FormsModule,
	AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCjd71SfnccCzf95_eYf9eTzOOvr2d2Xyg',
	  libraries: ["places"]
  	}),
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
