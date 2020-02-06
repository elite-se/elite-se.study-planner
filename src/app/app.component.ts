import { Component } from "@angular/core";
import { Modul, Veranstaltung } from "./datatypes/veranstaltung";
import { StudiengangService } from "./services/studiengang.service";
import { Regel } from "./datatypes/studiegang";
import { BelegungService } from "./services/belegung.service";

export class StatefulRegel {
  lastCheckState: boolean;
  regel: Regel;

  constructor(regel: Regel) {
    this.lastCheckState = false;
    this.regel = regel;
  }

  check(studiengangVeranstaltungen: Veranstaltung[], planung: Veranstaltung[]) {
    this.lastCheckState = this.regel.check(studiengangVeranstaltungen, planung);
    return this.lastCheckState;
  }
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  module: Modul[] = [];
  semester: number[] = [];
  regeln: StatefulRegel[] = [];

  allRegelnCheck: boolean = false;
  get succesfulRegelnCount(): number {
    return this.regeln.filter(r => {
      return r.lastCheckState;
    }).length;
  }

  regelnHidden: boolean = true;

  constructor(
    private studiengangService: StudiengangService,
    private belegungService: BelegungService
  ) {
    this.studiengangService.selectedStudiengangChange.subscribe(() => {
      this.module = this.studiengangService.module;
      this.semester = [
        ...Array(this.studiengangService.anzSemester).keys()
      ].map(x => ++x); //create array with numbers of the semesters in it and offset from starting zero for better readibility

      this.regeln = this.studiengangService.regeln.map(r => {
        return new StatefulRegel(r);
      });

      this.pruefeRegeln();
    });

    this.belegungService.belegteVeranstaltungenChange.subscribe(() => {
      this.pruefeRegeln();
    });
  }

  toggleRegelnHidden() {
    this.regelnHidden = !this.regelnHidden;
  }

  private pruefeRegeln() {
    console.log("Checking all rules");

    let checkAccumulator = true;

    for (let stateFulregel of this.regeln) {
      console.log("Rule check");
      let checkResult = stateFulregel.check(
        this.studiengangService.allVeranstaltungen,
        this.belegungService.belegteVeranstaltungen
      );

      checkAccumulator = checkAccumulator && checkResult;

      if (!checkResult) {
        console.log("Check failed");
      } else {
        console.log("Check passed");
      }
    }
    this.allRegelnCheck = checkAccumulator;
  }
}
