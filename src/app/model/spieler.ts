import { listener } from "@angular/core/src/render3";

export class Spieler  {

  private static list = [];

  public static get(id: number): Spieler {
    return this.list.find(s => s.id === id);
  }

  constructor(public id: number, public name: string, public isAktiv = true) {
    Spieler.list.push(this);
  }

  toString() {
    return `${this.id} -  ${this.name}`;
  }

}

