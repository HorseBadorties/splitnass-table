import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


import {ButtonModule} from 'primeng/button';
import {SpinnerModule} from 'primeng/spinner';
import {TableModule} from 'primeng/table';

@NgModule({
  exports: [    
    TableModule,
    ButtonModule,
    SpinnerModule
  ]
})
export class DemoMaterialModule {}


@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, DemoMaterialModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
