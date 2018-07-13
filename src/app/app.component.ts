import {Component, ViewChildren, QueryList, ViewContainerRef, OnInit} from '@angular/core';

import { Runde } from './model/Runde';
import { RundenService } from './runden.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  aktuelleRunde: number;
  focused: Runde;
  displayedColumns: String[];
  dataSource: MatTableDataSource<Runde>;
  // https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e
  @ViewChildren('matrow', { read: ViewContainerRef }) rows: QueryList<ViewContainerRef>;

  constructor(public rundenService: RundenService) {}

  ngOnInit() {   
    this.rundenService.getRunden().subscribe(runden => this.dataSource = new MatTableDataSource(runden));
    this.rundenService.getColumnNames().subscribe(columns => this.displayedColumns = columns);
  }

  addRunde() {       
    let newRunde: Runde;
    this.rundenService.addRunde().subscribe(r => newRunde = r);
    this.dataSource.data = this.dataSource.data.concat(newRunde);  // re-assigning data triggers the mat-table update      
    this.scrollToRunde(this.getRundeByNr(newRunde.nr - 1));
  }

  getNrByRunde(row: Runde): number {
    return row.nr;
  }

  getRundeByNr(nr: number): Runde {
    console.log("getRundeByNr " + nr);
    return this.dataSource.data.find(r => r.nr == nr);
  }

  rundeClicked(runde: Runde) {
    console.log(`Runde ${runde.nr} clicked`);
    this.focusRunde(runde);
  }

  focusRunde(runde: Runde) {      
    this.focused = runde;
  }
  
  scrollToRunde(runde: Runde) {
    if (runde != null) {      
      this.scrollToNr(runde.nr.toString());
      this.focusRunde(runde);
    }
  }

  scrollToNr(nr: string) {    
    let row = this.rows.find(row => row.element.nativeElement.getAttribute('nr') === nr); //[attr.nr]="getNrByRunde(runde)"
    if (row != null) {
        row.element.nativeElement.scrollIntoView(false, {behavior: 'smooth'});
        console.log("scrolled to " + nr);
    } else {
      console.log("failed to scroll to " + nr);
    }
  }
}
