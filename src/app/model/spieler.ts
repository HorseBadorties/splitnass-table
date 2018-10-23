
export class Spieler  {
    constructor(public id: number, public name: string) {}

    toJSON() {
        return this.id;
    }

}

