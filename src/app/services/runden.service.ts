import { Injectable } from '@angular/core';

import { Runde } from '../model/runde2';
import { BehaviorSubject, Observable, of } from 'rxjs';


const RUNDEN: Runde[] = [
  new Runde(14, '*', '*', '*', '-', '*', 3, 16),
  new Runde(15, '*', '156', '*', '121', '-', 2, 32),
  new Runde(16, '-',  '168', '*', '132',  '*',  2, 12),
  new Runde(17, '*',  '-', '141', '144',  '*',  2, 12),
  new Runde(18, '*',  '174', '-', '*',  '*',  1, 6),
  new Runde(19, '*',  '178', '-', '*',  '109',  1, 4),
  new Runde(20, '62', '*', '149', '-',  '*',  1, 8),
  new Runde(21, '*',  '*', '161', '156',  '-',  1, 12),
  new Runde(22, '-',  '*', '*', '168',  '121',  1, 12),
  new Runde(23, '68', '-', '167', '*',  '*',  1, 6),
  new Runde(24, '*',  '180', '-', '170',  '*',  0, 2),
  new Runde(25, '*',  '198', '185', '-',  '*',  1, 18)
];

@Injectable({
  providedIn: 'root'
})
export class RundenService {

  rundenSubject: BehaviorSubject<Runde[]> = new BehaviorSubject(RUNDEN);

  constructor() {}

  getColumnNames(): Observable<Column[]> {
    return of([
      new Column('nr', 'Runde', '100%'),
      new Column('torsten', 'Torsten', '100%'),
      new Column('guido', 'Guido', '100%'),
      new Column('thomas', 'Thomas', '100%'),
      new Column('claus', 'Claus', '100%'),
      new Column('levent', 'Levent', '100%'),
      new Column('boeckeAsString', 'Böcke', '100%'),
      new Column('punkteAsString', 'Punkte', '100%')]);
  }

  addRunde() {
    const newRunde = new Runde(RUNDEN[RUNDEN.length - 1].nr + 1);
    RUNDEN.push(newRunde);
    this.rundenSubject.next(RUNDEN);
  }

}

export class Column {
  constructor(public field: String, public header: String, public width: String) {}
}






