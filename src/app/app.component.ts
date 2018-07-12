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
  {nr: 14, torsten: '*', guido: '*', claus: '*', thomas: '-', levent: '*', boecke: '|||', punkte: 16},
  {nr: 15, torsten: '*', guido: '156', claus: '*', thomas: '120', levent: '-', boecke: '||', punkte: 32},
  {nr: 16, torsten: '-', guido: '168', claus: '*', thomas: '132', levent: '*', boecke: '||', punkte: 12},
  {nr: 17, torsten: '*', guido: '-', claus: '141', thomas: '144', levent: '*', boecke: '||', punkte: 12},
  {nr: 18, torsten: '*', guido: '174', claus: '-', thomas: '*', levent: '*', boecke: '|', punkte: 6},
  {nr: 19, torsten: '*', guido: '178', claus: '-', thomas: '*', levent: '109', boecke: '|', punkte: 4},
  {nr: 20, torsten: '62', guido: '*', claus: '149', thomas: '-', levent: '*', boecke: '|', punkte: 8},
  {nr: 21, torsten: '*', guido: '*', claus: '161', thomas: '156', levent: '-', boecke: '|', punkte: 12},
  {nr: 22, torsten: '-', guido: '*', claus: '*', thomas: '168', levent: '121', boecke: '|', punkte: 12},
  {nr: 23, torsten: '68', guido: '-', claus: '167', thomas: '*', levent: '*', boecke: '|', punkte: 6},
  {nr: 24, torsten: '*', guido: '180', claus: '-', thomas: '170', levent: '*', boecke: '', punkte: 2},
  {nr: 25, torsten: '*', guido: '198', claus: '185', thomas: '-', levent: '*', boecke: '|', punkte: 18},
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  aktuelleRunde: number;
  focused: Runde = RUNDEN[0];
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
    console.log(`Runde ${runde.nr} clicked`)
    this.focusRunde(runde);
  }

  focusRunde(runde: Runde) {      
    this.focused = runde;
  }
  
  recTrackBy(index: number, runde: Runde){
    return runde.nr;
  }
  scrollToRunde(runde: Runde) {
    console.log("scrolling to " + runde.nr);
    this.showElement(runde.nr, 20);
    this.focusRunde(runde);
  }

  showElement(index: number, height: number) {    
    let indexstr = index.toString();
    let row = this.rows.find(row => row.element.nativeElement.getAttribute('nr') === indexstr); 
    if (row != null) {
      let rect = row.element.nativeElement.getBoundingClientRect();
      if ((rect.y <= 0) || ((rect.y+rect.height) > height)) {        
        row.element.nativeElement.scrollIntoView(false, {behavior: 'smooth'});
      }
    } else {
      console.log('not found');
    }
  }
}
