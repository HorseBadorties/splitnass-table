import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatButtonModule, MatTableModule } from '@angular/material';

@NgModule({
  imports:      [ BrowserModule, FormsModule, MatButtonModule, MatTableModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
