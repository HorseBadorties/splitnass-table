import { Spieler } from './spieler';

export class Spieler2 {

    public spieler: [Spieler, Spieler];

    constructor(public name: string) {}

    foo() {
        console.log('foo called');
    }

}


const torsten = new Spieler2('torsten');
torsten.spieler = [
    new Spieler(1, 'Torsten'),
    new Spieler(2, 'Claus')
];
console.log(torsten);
const stringified = JSON.stringify(torsten);
console.log(`JSON: ${stringified}`);
let r2: Spieler2;
r2 = Object.assign(new Spieler2(undefined), JSON.parse(stringified));
console.log(r2);
console.log(`result is${r2 instanceof Spieler2 ? '' : ' not'} a Spieler2`);
r2.foo();
