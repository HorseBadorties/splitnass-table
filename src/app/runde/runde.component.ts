import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-runde',
  templateUrl: './runde.component.html',
  styleUrls: ['./runde.component.css']
})
export class RundeComponent implements OnInit {

  aktuelleRunde = 23;
  gesamtRunden = 102;
  statusDerRunde = 'aktuell gespielte Runde';
  rundeninfo = [
    "Geber: Claus", 
    "Böcke: 2", 
    "Ergebnis vorherige Runde: 64"    
  ]
  punktestand = ["Punktestand: Claus=350, Thomas=494, Torsten=482, Guido=254"];

  constructor() { }

  ngOnInit() {
  }

  toRundenliste() {

  }

}
