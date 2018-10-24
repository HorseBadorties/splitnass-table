
export class Spieler  {

  public static get(id: number): Spieler {
    return new Spieler(id, `Dummy ${id}`);
  }

  constructor(public id: number, public name: string, public isAktiv = true) {}

  toJSON() {
      return this.id;
  }

  toString() {
    return `${this.id} -  ${this.name}`;
  }

}

