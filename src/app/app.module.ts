import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SpinnerModule } from 'primeng/spinner';
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

import { AppComponent } from './app.component';
import { RundeComponent } from './runde/runde.component';
import { RundenlisteComponent } from './rundenliste/rundenliste.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent, 
    RundeComponent, 
    RundenlisteComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    FormsModule, 
    TableModule,
    ButtonModule,
    SpinnerModule,
    FieldsetModule,
    ChipsModule,
    DropdownModule,
    CheckboxModule,
    AppRoutingModule
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }

