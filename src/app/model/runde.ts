import { Solo } from "./solo";
import { Spieler } from "./spieler";

export class Runde {

  constructor(
    public nr: number,
    public spieler: Array<Spieler> = [],
    public geber?: Spieler,
    public aufspieler?: Spieler,
    public gewinner: Array<Spieler> = [],
    // Ansagen
    public reVonVorneHerein = false,
    public reAngesagt = Ansage.KeineAnsage,
    public kontraVonVorneHerein = false,
    public kontraAngesagt = Ansage.KeineAnsage,
    // Boecke
    public boecke = 0,
    public boeckeBeiBeginn = 0,
    // Gespielt
    // 0 = kein Ergebnis/gespaltener Arsch, positiv = Re gewinnt, negativ = Kontra gewinnt
    public gespielt?: Gespielt,
    public solo = Solo.KEIN_SOLO,
    public reGewinnt = false,
    public gegenDieSau = false,
    public extrapunkte = 0,
    public armut = false,
    public herzGehtRum = false,
    public ergebnis: number = -1) { }

  public isAktuelleRunde() {
    return this.ergebnis === -1 && this.geber;
  }

  public isGespielteRunde() {
    return this.ergebnis > -1;
  }

  public berechneErgebnis() {
    this.ergebnis = 0;
    // Boecke
    this.boecke = this.boeckeBeiBeginn;
    if (this.reAngesagt) {
      this.boecke++;
    }
    if (this.kontraAngesagt) {
      this.boecke++;
    }
    if (this.gespielt === 0) {
      // Gespaltener Arsch!?
      return this.ergebnis;
    }
    let gespieltePunkte = Math.abs(this.gespielt);
    if (this.solo === Solo.NULL) {
      // Bei Null zählt das angesagte Ergebnis. Wenn nichts angesagt, dann 120
      gespieltePunkte = this.reAngesagt > 0 ? this.reAngesagt : 1;
    }
    // Re un Kontra haben falsche Ansagen gemacht: gespaltener Arsch
    if (gespieltePunkte < this.reAngesagt && gespieltePunkte < this.kontraAngesagt && this.solo !== Solo.NULL) {
      this.ergebnis = 0;
      return this.ergebnis;
    }
    // nichts angesagt und keine 6 oder besser: gespaltener Arsch
    if (gespieltePunkte >= 3 && !this.reAngesagt && !this.kontraAngesagt && this.solo !== Solo.NULL) {
      this.ergebnis = 0;
      return this.ergebnis;
    }
    // Hat unter Berücksichtigung der Ansagen Re oder Kontra gewonnen?
    this.reGewinnt = this.gespielt > 0;
    if (this.reGewinnt) {
      this.reGewinnt = this.gespielt.valueOf() >= this.reAngesagt.valueOf() || this.solo === Solo.NULL;
    } else {
      this.reGewinnt = gespieltePunkte < this.kontraAngesagt;
    }
    // Gegen die Alten?
    const gegenDieAlten = !this.reGewinnt && !this.armut && this.solo.gegenDieAltenMoeglich;
    // berechnen
    const maxAnsage = Math.max(this.reAngesagt, this.kontraAngesagt);
    if (maxAnsage > gespieltePunkte && this.solo !== Solo.NULL) {
      const relevanteAnsage = this.reGewinnt ? this.kontraAngesagt : this.reAngesagt;
      for (let i = maxAnsage; i > gespieltePunkte; i--) {
        if (relevanteAnsage >= i) {
          this.ergebnis += 2;
        }
      }
    }
    for (let i = gespieltePunkte; i > 0; i--) {
      this.ergebnis++;
      if (i > 1 && this.reAngesagt >= i) {
        this.ergebnis++;
        if (!this.reGewinnt && this.gespielt < 0 && this.solo !== Solo.NULL) {
          this.ergebnis++;
        }
      }
      if (i > 1 && this.kontraAngesagt >= i) {
        this.ergebnis++;
        if (this.reGewinnt && this.gespielt > 0 && this.solo !== Solo.NULL) {
          this.ergebnis++;
        }
      }
    }
    if (gegenDieAlten) {
      this.ergebnis++;
    }
    if (this.gegenDieSau && this.solo.sauMoeglich) {
      this.ergebnis++;
    }
    if (this.solo !== Solo.KEIN_SOLO) {
      this.ergebnis++;
    }
    // verlorenes Solo?
    if (this.ergebnis > 0 && this.solo !== Solo.KEIN_SOLO && !this.reGewinnt) {
      this.ergebnis++;
    }
    if (this.reVonVorneHerein) {
      this.ergebnis++;
    }
    if (this.kontraVonVorneHerein) {
      this.ergebnis++;
    }
    if (this.extrapunkte !== 0) {
      this.ergebnis += this.extrapunkte;
    }
    // durch negative Extrapunkte kann die Gegenseite gewonnen haben...! (gegenDieAlten etc.)
    if (this.ergebnis < 0) {
      this.ergebnis = Math.abs(this.ergebnis);
      this.reGewinnt = !this.reGewinnt;
    }
    // Böcke
    if (this.boecke) {
      this.ergebnis = this.boecke * 2 * this.ergebnis;
    }
    return this.ergebnis;
  }

}

export enum Gespielt {
  GespaltenerArsch = 0,
  Re = 1,
  ReKeine9 = 2,
  ReKeine6 = 3,
  ReKeine3 = 4,
  ReSchwarz = 5,
  Kontra = -1,
  KontraKeine9 = -2,
  KontraKeine6 = -3,
  KontraKeine3 = -4,
  KontraSchwarz = -5,
}

export enum Ansage {
  KeineAnsage = 0,
  ReOderKontra = 1,
  Keine9 = 2,
  Keine6 = 3,
  Keine3 = 4,
  Schwarz = 5
}
