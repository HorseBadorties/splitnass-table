export interface ISpieler {
    id: number;
    name: string;
}

export class Spieler implements ISpieler {
    constructor(public id: number, public name: string) {}

    toJSON() {
        return this.id;
    }

    static fromJSON(json: string): ISpieler {
      return JSON.parse(json, (key, value) => {      
        let result = new Spieler(value, null);
        result.name = 'restored';
        return result;
      });
    }
}

