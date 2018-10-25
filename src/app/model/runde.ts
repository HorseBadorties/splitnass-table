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
    public reVonVorneHerein = 0,
    public reAngesagt = 0,
    public kontraVonVorneHerein = 0,
    public kontraAngesagt = 0,
    // Boecke
    public boecke = 0,
    public boeckeBeiBeginn = 0,
    // Gespielt
    public gespielt = 0, // 0 = kein Ergebnis/gespaltener Arsch, positiv = Re gewinnt, negativ = Kontra gewinnt
    public solo = Solo.KEIN_SOLO,
    public gegenDieAlten = false,
    public gegenDieSau = false,
    public extrapunkte = 0,
    public armut = false,
    public herzGehtRum = false,
    public ergebnis: number = -1) {}

  public isAktuelleRunde() {
    return this.ergebnis === -1 && this.geber;
  }

  public isGespielteRunde() {
    return this.ergebnis > -1;
  }
}


