import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForecastComponent } from './forecast/forecast.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutocompleteLibModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
