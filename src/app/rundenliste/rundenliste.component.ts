import { Component, ViewChildren, QueryList, ElementRef, OnInit, AfterViewInit } from "@angular/core";

import { Spieltag } from "../model/spieltag";
import { Runde } from "../model/runde";
import { SpieltagService } from "../services/spieltag.service";

@Component({
  selector: "app-rundenliste",
  templateUrl: "./rundenliste.component.html",
  styleUrls: ["./rundenliste.component.css"]
})
export class RundenlisteComponent implements OnInit, AfterViewInit {

  spieltag: Spieltag;
  selectedRunde: Runde;
  displayedColumns: Column[];
  // https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e
  @ViewChildren("primerow", { read: ElementRef }) rowsPrime: QueryList<ElementRef>;

  constructor(public spieltagService: SpieltagService) {}

  ngOnInit() {
    this.spieltagService.getAktuellerSpieltag().subscribe(spieltag => {
      this.spieltag = spieltag;
      this.calcDisplayedColumns();
      this.selectedRunde = spieltag.aktuelleRunde;
    });
  }

  ngAfterViewInit() {
    this.scrollToRunde(this.spieltag.aktuelleRunde);
   }

  private calcDisplayedColumns() {
    const result = [new Column("nr", "Runde", "60%")];
    this.spieltag.spieler.forEach(spieler => result.push(new Column(spieler.id.toString(), spieler.name, "100%")));
    result.push(new Column("boecke", "Böcke", "60%"));
    result.push(new Column("ergebnis", "Punkte", "60%"));
    this.displayedColumns = result;
  }

  getValueFor(runde: Runde, field: string) {
    switch (field) {
      case "nr": return runde.nr;
      case "boecke": return "|".repeat(runde.boecke);
      case "ergebnis": return runde.ergebnis > 0 ? runde.ergebnis.toString() : "";
      default: {
        const spieler = this.spieltag.spieler.find(s => s.id === Number.parseInt(field));
        if (runde.isAktuelleRunde()) {
          if (runde.geber === spieler) {
            return "Geber";
          } else if (runde.aufspieler === spieler) {
            return "Aufspiel";
          }
        } else if (runde.isGespielteRunde()) {
          if (runde.spieler.includes(spieler)) {
            if (runde.gewinner.includes(spieler)) {
              return this.spieltag.getPunktestand(runde, spieler).toString();
            } else {
              return "*";
            }
          } else {
            return "-";
          }
        }
        return "";
      }
    }
  }

  getIndex(index: number, item: Runde) {
    return item.nr;
  }

  buttonClicked() {
    this.selectedRunde.ergebnis = 32;
    this.selectedRunde.boecke = 2;
    const spieler = this.spieltag.spieler.slice(0, 4);
    this.selectedRunde.spieler = spieler;
    this.selectedRunde.gewinner = spieler.slice(0, 2);
    this.spieltag.aktuelleRunde = this.selectedRunde;
  }

  scrollToRunde(runde: Runde) {
    if (runde) {
      if (this.selectedRunde !== runde) {
        this.selectedRunde = runde;
      }
      this.scrollToNr(runde.nr.toString());
    }
  }

  private scrollToNr(nr: string) {
    this.scrollTo(this.rowsPrime.find(r => r.nativeElement.getAttribute("nr") === nr));
  }

  private scrollTo(row: ElementRef) {
    if (row != null) {
      row.nativeElement.scrollIntoView(false, {behavior: "smooth"});
    }
  }

}

export class Column {
  constructor(public field: String, public header: String, public width: String) {}
}
