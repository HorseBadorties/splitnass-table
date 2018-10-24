import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-runde",
  templateUrl: "./runde.component.html",
  styleUrls: ["./runde.component.css"]
})
export class RundeComponent implements OnInit {

  aktuelleRunde = 23;
  gesamtRunden = 102;
  statusDerRunde = "aktuell laufende Runde";
  rundeninfo = [];
  punktestand = [];
  moeglicheReAnsagen = [];
  moeglicheKontraAnsagen = [];
  reAngesagt = 0;
  kontraAngesagt = 0;
  reVonVorneherein = false;
  kontraVonVorneherein = false;


  constructor() {
    this.punktestand = ["Punktestand: Claus=350, Thomas=494, Torsten=482, Guido=254"];
    this.rundeninfo = [
      "Geber: Claus",
      "Böcke: 2",
      "Ergebnis vorherige Runde: 64"
    ];
    this.moeglicheReAnsagen = [
      {label: "Keine Ansagen", value: 0},
      {label: "Re", value: 1},
      {label: "keine 9", value: 2},
      {label: "keine 6", value: 3},
      {label: "keine 3", value: 4},
      {label: "schwarz", value: 5}
    ];
    this.moeglicheKontraAnsagen = [
      {label: "Keine Ansagen", value: 0},
      {label: "Kontra", value: 1},
      {label: "keine 9", value: 2},
      {label: "keine 6", value: 3},
      {label: "keine 3", value: 4},
      {label: "schwarz", value: 5}
    ];
  }

  ngOnInit() {
  }

}
