import {Component, ViewChildren, QueryList, ViewContainerRef} from '@angular/core';

export interface Runde {
  nr: number;
  torsten: string;  
  guido: string;  
  claus: string;  
  thomas: string;  
  levent: string;  
  boecke: string;
  punkte: number;
}

const RUNDEN: Runde[] = [
  {nr: 14, torsten: '*',  guido: '*',   claus: '*',   thomas: '-',    levent: '*',    boecke: '|||',  punkte: 16},
  {nr: 15, torsten: '*',  guido: '156', claus: '*',   thomas: '120',  levent: '-',    boecke: '||',   punkte: 32},
  {nr: 16, torsten: '-',  guido: '168', claus: '*',   thomas: '132',  levent: '*',    boecke: '||',   punkte: 12},
  {nr: 17, torsten: '*',  guido: '-',   claus: '141', thomas: '144',  levent: '*',    boecke: '||',   punkte: 12},
  {nr: 18, torsten: '*',  guido: '174', claus: '-',   thomas: '*',    levent: '*',    boecke: '|',    punkte: 6},
  {nr: 19, torsten: '*',  guido: '178', claus: '-',   thomas: '*',    levent: '109',  boecke: '|',    punkte: 4},
  {nr: 20, torsten: '62', guido: '*',   claus: '149', thomas: '-',    levent: '*',    boecke: '|',    punkte: 8},
  {nr: 21, torsten: '*',  guido: '*',   claus: '161', thomas: '156',  levent: '-',    boecke: '|',    punkte: 12},
  {nr: 22, torsten: '-',  guido: '*',   claus: '*',   thomas: '168',  levent: '121',  boecke: '|',    punkte: 12},
  {nr: 23, torsten: '68', guido: '-',   claus: '167', thomas: '*',    levent: '*',    boecke: '|',    punkte: 6},
  {nr: 24, torsten: '*',  guido: '180', claus: '-',   thomas: '170',  levent: '*',    boecke: '',     punkte: 2},
  {nr: 25, torsten: '*',  guido: '198', claus: '185', thomas: '-',    levent: '*',    boecke: '|',    punkte: 18},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  aktuelleRunde: number;
  focused: Runde;
  displayedColumns: string[] = ['Runde', 'Torsten', 'Guido', 'Thomas', 'Claus', 'Levent', 'Böcke', 'Punkte'];
  dataSource = RUNDEN;
  // https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e
  @ViewChildren('matrow', { read: ViewContainerRef }) rows: QueryList<ViewContainerRef>;

  getNrByRunde(row: Runde): number {
    return row.nr;
  }

  getRundeByNr(nr: number): Runde {
    console.log("getRundeByNr " + nr);
    return RUNDEN.find(r => r.nr == nr);
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
