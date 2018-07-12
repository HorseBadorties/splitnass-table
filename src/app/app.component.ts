import { Component, OnInit } from '@angular/core';

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
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['Runde', 'Torsten', 'Guido', 'Thomas', 'Claus', 'Levent', 'Böcke', 'Punkte'];
  dataSource = RUNDEN;

  ngOnInit() { this.scrollBottom(); }

  scrollBottom() {
    // document.querySelector('mat-table').scrollBy(0, 10000);
  }
}
