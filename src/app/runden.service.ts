import { Injectable } from '@angular/core';

import { Runde } from './model/Runde';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RundenService {
  
  constructor() { }
  
  getColumnNames(): Observable<String[]> {
    return of(['Runde', 'Torsten', 'Guido', 'Thomas', 'Claus', 'Levent', 'Böcke', 'Punkte']);
  }
  
  getRunden(): Observable<Runde[]> {
    return of(RUNDEN);
  }

  addRunde(): Observable<Runde> {
    let newRunde = new Runde(RUNDEN[RUNDEN.length-1].nr + 1);
    RUNDEN.push(newRunde);
    return of(newRunde);
  }

}

const RUNDEN: Runde[] = [
  {nr: 14, torsten: '*',  guido: '*',   claus: '*',   thomas: '-',    levent: '*',    boecke: 3,  punkte: 16},
  {nr: 15, torsten: '*',  guido: '156', claus: '*',   thomas: '120',  levent: '-',    boecke: 2,   punkte: 32},
  {nr: 16, torsten: '-',  guido: '168', claus: '*',   thomas: '132',  levent: '*',    boecke: 2,   punkte: 12},
  {nr: 17, torsten: '*',  guido: '-',   claus: '141', thomas: '144',  levent: '*',    boecke: 2,   punkte: 12},
  {nr: 18, torsten: '*',  guido: '174', claus: '-',   thomas: '*',    levent: '*',    boecke: 1,   punkte: 6},
  {nr: 19, torsten: '*',  guido: '178', claus: '-',   thomas: '*',    levent: '109',  boecke: 1,   punkte: 4},
  {nr: 20, torsten: '62', guido: '*',   claus: '149', thomas: '-',    levent: '*',    boecke: 1,   punkte: 8},
  {nr: 21, torsten: '*',  guido: '*',   claus: '161', thomas: '156',  levent: '-',    boecke: 1,   punkte: 12},
  {nr: 22, torsten: '-',  guido: '*',   claus: '*',   thomas: '168',  levent: '121',  boecke: 1,   punkte: 12},
  {nr: 23, torsten: '68', guido: '-',   claus: '167', thomas: '*',    levent: '*',    boecke: 1,   punkte: 6},
  {nr: 24, torsten: '*',  guido: '180', claus: '-',   thomas: '170',  levent: '*',    boecke: 0,   punkte: 2},
  {nr: 25, torsten: '*',  guido: '198', claus: '185', thomas: '-',    levent: '*',    boecke: 1,   punkte: 18},
];




