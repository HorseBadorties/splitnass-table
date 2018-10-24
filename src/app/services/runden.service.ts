import { Injectable } from "@angular/core";

import { Runde } from "../model/runde";
import { BehaviorSubject, Observable, of } from "rxjs";


const RUNDEN: Runde[] = [
  new Runde(14),
  new Runde(15),
  new Runde(16),
  new Runde(17),
  new Runde(18),
  new Runde(19),
  new Runde(20),
  new Runde(21),
  new Runde(22),
  new Runde(23),
  new Runde(24),
  new Runde(25)
];

@Injectable({
  providedIn: "root"
})
export class RundenService {

  rundenSubject: BehaviorSubject<Runde[]> = new BehaviorSubject(RUNDEN);

  constructor() {}


  addRunde() {
    const newRunde = new Runde(RUNDEN[RUNDEN.length - 1].nr + 1);
    RUNDEN.push(newRunde);
    this.rundenSubject.next(RUNDEN);
  }

}








