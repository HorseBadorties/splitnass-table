import {Component, ViewChildren, QueryList, ViewContainerRef, ElementRef, OnInit} from '@angular/core';

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
  selectedRunde: Runde;
  displayedColumns: String[];
  runden: Runde[];
  dataSource: MatTableDataSource<Runde>;
  // https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e
  @ViewChildren('matrow', { read: ElementRef }) rows: QueryList<ElementRef>;
  @ViewChildren('primerow', { read: ElementRef }) rowsPrime: QueryList<ElementRef>;

  constructor(public rundenService: RundenService) {}

  ngOnInit() {
    this.rundenService.getRunden().subscribe(_runden => {
      this.dataSource = new MatTableDataSource(_runden);
      this.runden = _runden;
    });
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
    console.log('getRundeByNr ' + nr);
    return this.dataSource.data.find(r => r.nr == nr);
  }

  rundeClicked(runde: Runde) {
    console.log(`Runde ${runde.nr} clicked`);
    this.focusRunde(runde);
  }

  focusRunde(runde: Runde) {
    this.selectedRunde = runde;
  }

  scrollToRunde(runde: Runde) {
    if (runde != null) {
      this.focusRunde(runde);
      this.scrollToNr(runde.nr.toString());
    } 
  }

  scrollToNr(nr: string) {
    this.scrollTo(this.rows.find(r => r.nativeElement.getAttribute('nr') === nr));
    this.scrollTo(this.rowsPrime.find(r => r.nativeElement.getAttribute('nr') === nr));
  }

  private scrollTo(row: ElementRef) {
    if (row != null) {
      row.nativeElement.scrollIntoView(false, {behavior: 'smooth'});
    }
  }

}
