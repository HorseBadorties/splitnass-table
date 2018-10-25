import { Component, OnInit } from "@angular/core";
import { SpieltagService } from "../services/spieltag.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { Runde, Gespielt, Ansage } from "../model/runde";
import { Spieltag } from "../model/spieltag";
import { Solo } from "../model/solo";
import { Spieler } from "../model/spieler";

@Component({
  selector: "app-runde",
  templateUrl: "./runde.component.html",
  styleUrls: ["./runde.component.css"],
  providers: [MessageService, ConfirmationService]
})
export class RundeComponent implements OnInit {
  spieltag: Spieltag;
  aktuelleRunde: Runde;
  displayGewinnerDialog = false;
  selectedGewinner: Spieler[];


  constructor(
    public spieltagService: SpieltagService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  isNochNichtGespielteRunde() {
    return !this.aktuelleRunde.isGespielteRunde() && !this.aktuelleRunde.isAktuelleRunde();
  }

  rundeAbrechnen() {
    if (this.aktuelleRunde.gespielt === Gespielt.GespaltenerArsch) {
      this.confirmGespaltenerArsch();
    } else {
      this.pickGewinner();
    }
  }

  pickGewinner() {
    this.displayGewinnerDialog = true;
  }

  berechneErgebnis() {
    this.displayGewinnerDialog = false;
    this.aktuelleRunde.berechneErgebnis();
    this.messageService.add({severity: "info", summary: "Ergebnis der Runde", detail: this.aktuelleRunde.ergebnis.toString()});
  }

  confirmGespaltenerArsch() {
    this.confirmationService.confirm({
      header: "Gespaltener Arsch?",
      message: "Really?",
      accept: () => {
        this.pickGewinner();
      }
    });
  }

  getMoeglicheAnsagen(fuerRe: boolean) {
    return [
      {label: "Keine Ansagen", value: Ansage.KeineAnsage.valueOf()},
      {label: `${fuerRe ? "Re" : "Kontra"}`, value: Ansage.ReOderKontra.valueOf()},
      {label: "keine 9", value: Ansage.Keine9.valueOf()},
      {label: "keine 6", value: Ansage.Keine6.valueOf()},
      {label: "keine 3", value: Ansage.Keine3.valueOf()},
      {label: "schwarz", value: Ansage.Schwarz.valueOf()}
    ];
  }

  getMoeglicheErgebnisse() {
    return [
      {label: "Gespaltener Arsch", value: Gespielt.GespaltenerArsch.valueOf()},
      {label: "Re gewinnt", value: Gespielt.Re.valueOf()},
      {label: "Re gewinnt keine 9", value: Gespielt.ReKeine9.valueOf()},
      {label: "Re gewinnt keine 6", value: Gespielt.ReKeine6.valueOf()},
      {label: "Re gewinnt keine 3", value: Gespielt.ReKeine3.valueOf()},
      {label: "Re gewinnt schwarz", value: Gespielt.ReSchwarz.valueOf()},
      {label: "Kontra gewinnt", value: Gespielt.Kontra.valueOf()},
      {label: "Kontra gewinnt keine 9", value: Gespielt.KontraKeine9.valueOf()},
      {label: "Kontra gewinnt keine 6", value: Gespielt.KontraKeine6.valueOf()},
      {label: "Kontra gewinnt keine 3", value: Gespielt.KontraKeine3.valueOf()},
      {label: "Kontra gewinnt schwarz", value: Gespielt.KontraSchwarz.valueOf()}
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
      if (this.spieltagService.selectedRunde) {
        this.aktuelleRunde = this.spieltagService.selectedRunde;
      }
    });
  }

  getStatusDerRunde() {
    if (this.aktuelleRunde.isAktuelleRunde()) {
      return "aktuell laufende Runde";
    } else if (this.aktuelleRunde.isGespielteRunde()) {
      return "bereits gespielte Runde";
    } else {
      return "noch nicht begonnene Runde";
    }
  }

  getRundenInfo() {
    const result = [];
    if (this.aktuelleRunde.isAktuelleRunde()) {
      result.push(`Geber: ${this.aktuelleRunde.geber.name}`);
      result.push(`Aufspielt: ${this.aktuelleRunde.aufspieler.name}`);
      result.push(`Böcke: ${this.aktuelleRunde.boeckeBeiBeginn}`);
      if (this.getErgebnisVorherigeRunde()) {
        result.push(`Ergebnis vorherige Runde: ${this.getErgebnisVorherigeRunde()}`);
      }
    } else if (this.aktuelleRunde.isGespielteRunde()) {
      result.push(`Geber: ${this.aktuelleRunde.geber.name}`);
      result.push(`Ergebnis: ${this.aktuelleRunde.ergebnis}`);
      result.push(`Gewinner: ${this.getGewinner()}`);
    } else {
      result.push(`Böcke: ${this.aktuelleRunde.boeckeBeiBeginn}`);
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
