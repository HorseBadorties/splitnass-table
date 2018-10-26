import { Runde } from "./runde";
import { Spieler } from "./spieler";

export class Spieltag {
    constructor(
        public key?: string,
        public beginn?: Date,
        public ende?: Date,
        public anzahlRunden = 0,
        public runden: Array<Runde> = [],
        public aktuelleRunde?: Runde,
        public spieler: Array<Spieler> = []) {}

  start(anzahlRunden: number, spieler: Array<Spieler>, geber: Spieler) {
    this.beginn = new Date();
    this.spieler = spieler;
    this.anzahlRunden = anzahlRunden;
    for (let i = 0; i < this.anzahlRunden; i++) {
      this.runden.push(new Runde(i + 1));
    }
    this.aktuelleRunde = this.runden[0];
    this.aktuelleRunde.geber = geber;
    this.aktuelleRunde.spieler = this.getSpieler(geber);
    this.aktuelleRunde.aufspieler = this.getNaechstenSpieler(geber);
  }

  startNaechsteRunde() {
    const naechsteRunde = this.getNaechsteRunde(this.aktuelleRunde);
    naechsteRunde.geber = this.aktuelleRunde.solo.regulaeresAufspiel
      ? this.getNaechstenSpieler(this.aktuelleRunde.geber) : this.aktuelleRunde.geber;
    naechsteRunde.spieler = this.getSpieler(naechsteRunde.geber);
    naechsteRunde.aufspieler = this.getNaechstenSpieler(naechsteRunde.geber);
    this.aktuelleRunde = naechsteRunde;
  }

  private getSpieler(geber: Spieler): Array<Spieler> {
    const result = [];
    let _spieler = geber;
    for (let i = 0; i < 4; i++) {
      _spieler = this.getNaechstenSpieler(_spieler);
      result.push(_spieler);
    }
    return result;
  }

  private getNaechstenSpieler(spieler: Spieler) {
    const i = this.spieler.indexOf(spieler);
    const next = i === this.spieler.length - 1 ? this.spieler[0] : this.spieler[i + 1];
    return next.isAktiv ? next : this.getNaechstenSpieler(next);
  }

  public getPunktestand(runde: Runde, spieler: Spieler) {
    return this.runden.slice(0, this.runden.indexOf(runde) + 1)
      .filter(r => r.gewinner.includes(spieler))
      .map(r => r.ergebnis)
      .reduce((acc, curr) => acc + curr, 0);
  }

  public getVorherigeRunde(runde: Runde) {
    const indexOfRunde = this.runden.indexOf(runde);
    return indexOfRunde > 0 ? this.runden[indexOfRunde - 1] : undefined;
  }

  public getNaechsteRunde(runde: Runde) {
    const indexOfRunde = this.runden.indexOf(runde);
    return indexOfRunde < this.runden.length - 1 ? this.runden[indexOfRunde + 1] : undefined;
  }
}
