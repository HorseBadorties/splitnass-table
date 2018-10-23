import { Component, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core';

import { Runde } from '../model/runde';
import { RundenService, Column } from '../services/runden.service';

@Component({
  selector: 'app-rundenliste',
  templateUrl: './rundenliste.component.html',
  // template: `<p-button label="Click"></p-button>`,
  styleUrls: ['./rundenliste.component.css']
})
export class RundenlisteComponent implements OnInit {

  selectedRunde: Runde;
  displayedColumns: Column[];
  runden: Runde[];
  // https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e
  @ViewChildren('primerow', { read: ElementRef }) rowsPrime: QueryList<ElementRef>;

  constructor(public rundenService: RundenService) {}

  ngOnInit() {
    this.rundenService.getColumnNames().subscribe(columns => this.displayedColumns = columns);
    this.rundenService.rundenSubject.subscribe(runden => this.runden = runden);
  }

  getIndex(index: number, item: Runde) {
    return item.nr;
  }

  addRunde() {
    // this.rundenService.addRunde();
    this.runden.push(new Runde(this.runden[this.runden.length - 1].nr + 1));
    this.runden[this.runden.length - 4].levent = '4711';
  }

  getNrByRunde(row: Runde): number {
    return row.nr;
  }

  getRundeByNr(nr: number): Runde {
    console.log('getRundeByNr ' + nr);
    return this.runden.find(r => r.nr == nr);
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
    this.scrollTo(this.rowsPrime.find(r => r.nativeElement.getAttribute('nr') === nr));
  }

  private scrollTo(row: ElementRef) {
    if (row != null) {
      row.nativeElement.scrollIntoView(false, {behavior: 'smooth'});
    }
  }


}
