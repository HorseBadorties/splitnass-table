import { Component, OnInit } from "@angular/core";
import { SpieltagService } from "../services/spieltag.service";
import { Runde } from "../model/runde";
import { Spieltag } from "../model/spieltag";
import { Solo } from "../model/solo";

@Component({
  selector: "app-runde",
  templateUrl: "./runde.component.html",
  styleUrls: ["./runde.component.css"]
})
export class RundeComponent implements OnInit {
  spieltag: Spieltag;
  aktuelleRunde: Runde;


  constructor(public spieltagService: SpieltagService) { }

  getMoeglicheAnsagen(fuerRe: boolean) {
    return [
      {label: "Keine Ansagen", value: 0},
      {label: `${fuerRe ? "Re" : "Kontra"}`, value: 1},
      {label: "keine 9", value: 2},
      {label: "keine 6", value: 3},
      {label: "keine 3", value: 4},
      {label: "schwarz", value: 5}
    ];
  }

  getMoeglicheErgebnisse() {
    return [
      {label: "Gespaltener Arsch", value: 0},
      {label: "Re gewinnt", value: 1},
      {label: "Re gewinnt keine 9", value: 2},
      {label: "Re gewinnt keine 6", value: 3},
      {label: "Re gewinnt keine 3", value: 4},
      {label: "Re gewinnt schwarz", value: 5},
      {label: "Kontra gewinnt", value: -1},
      {label: "Kontra gewinnt keine 9", value: -2},
      {label: "Kontra gewinnt keine 6", value: -3},
      {label: "Kontra gewinnt keine 3", value: -4},
      {label: "Kontra gewinnt schwarz", value: -5}
    ];
  }

  getMoeglicheSoli() {
    return [
      Solo.KEIN_SOLO,
      Solo.FLEISCHLOS,
      Solo.DAMENSOLO,
      Solo.BAUERNSOLO,
      Solo.TRUMPFSOLO,
      Solo.NULL,
      Solo.STILLES_SOLO
    ];
  }

  ngOnInit() {
    this.spieltagService.getAktuellerSpieltag().subscribe(spieltag => {
      this.spieltag = spieltag;
      this.aktuelleRunde = spieltag.aktuelleRunde;
    });
  }

  getStatusDerRunde() {
    if (this.aktuelleRunde.isAktuelleRunde) {
      return "aktuell laufende Runde";
    } else if (this.aktuelleRunde.isGespielteRunde) {
      return "bereits gespielte Runde";
    } else {
      return "noch nicht begonnene Runde";
    }
  }

  getRundenInfo() {
    const result = [];
    if (this.aktuelleRunde.isAktuelleRunde) {
      result.push(`Geber: ${this.aktuelleRunde.geber.name}`);
      result.push(`Aufspielt: ${this.aktuelleRunde.aufspieler.name}`);
      result.push(`Böcke: ${this.aktuelleRunde.boecke}`);
      if (this.getErgebnisVorherigeRunde()) {
        result.push(`Ergebnis vorherige Runde: ${this.getErgebnisVorherigeRunde()}`);
      }
    } else if (this.aktuelleRunde.isGespielteRunde) {
      result.push(`Geber: ${this.aktuelleRunde.geber.name}`);
      result.push(`Ergebnis: ${this.aktuelleRunde.ergebnis}`);
      result.push(`Gewinner: ${this.getGewinner()}`);
    } else {
      result.push(`Böcke: ${this.aktuelleRunde.boecke}`);
    }
    return result;
  }

  private getErgebnisVorherigeRunde() {
    const vorherigeRunde = this.spieltag.getVorherigeRunde(this.aktuelleRunde);
    if (vorherigeRunde) {
      return `Ergebnis vorherige Runde: ${vorherigeRunde.ergebnis}`;
    } else {
      return undefined;
    }
  }

  getPunktestand() {
    return "Punktestand: " + this.spieltag.spieler
    .map(spieler => `${spieler.name}=${this.spieltag.getPunktestand(this.aktuelleRunde, spieler)}`)
    .join(", ");
  }

  private getGewinner() {
    return this.aktuelleRunde.gewinner
      .map(spieler => spieler.name).join(",");
  }

}
