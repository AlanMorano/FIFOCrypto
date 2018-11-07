import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ROUTING} from './app.routing';
import {AppviewsModule} from './appviews/appviews.module';
import {LayoutsModule} from './layouts/layouts.module';
import {SharedModule} from './shared/shared.module';
import {MaterialModule} from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutsModule,
    AppviewsModule,
    SharedModule,
    MaterialModule,
    ROUTING,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
