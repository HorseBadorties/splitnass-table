export class Runde {
 
  constructor(
    public nr: number,
    public torsten = '',
    public guido = '',
    public claus = '',
    public thomas = '',
    public levent = '',
    public boecke = 0,
    public punkte = 0) {
  }

  get punkteAsString() {
    return this.punkte > 0 ? this.punkte.toString() : '';
  }

  get boeckeAsString() {
    return '|'.repeat(this.boecke);
  }

}


