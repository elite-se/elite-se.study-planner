import { Regel, Studiengang } from "../studiegang";
import { Veranstaltung, Modul, VeranstaltungsTyp } from "../veranstaltung";

export class AllePflichtRegel implements Regel {
  mnemonicDesc = "Alle Pflichtveranstaltungen sind eingeplant.";

  constructor() {}

  /**
   * Überprüft ob alle Pflichveranstaltungen in der Planung vorkommen.
   */
  check(
    studiengangVeranstaltungen: Veranstaltung[],
    belegung: Veranstaltung[]
  ): boolean {
    let pflichtVeranstaltungen = studiengangVeranstaltungen.filter(
      (v: Veranstaltung) => {
        return v.isPflicht;
      }
    );
    console.log("Checking Pflichtveranstaltungen", pflichtVeranstaltungen);
    for (let pflicht of pflichtVeranstaltungen) {
      console.log("Checking pflicht ", pflicht.id);
      let belegt = false;
      for (let geplant of belegung) {
        console.log("   Ist it", geplant.id);
        if (pflicht.id === geplant.id) {
          console.log("        Yes :)");
          belegt = true;
        }
      }
      if (!belegt) {
        console.log("Returning false");
        return false;
      }
    }
    return true;
  }
}

export class MinLPRegel implements Regel {
  minLP: number;
  mnemonicDesc: string;

  constructor(minLP: number) {
    this.minLP = minLP;
    this.mnemonicDesc = "Mindestens " + this.minLP + " LP sind eingeplant.";
  }

  /**
   * Überprüft, ob die Summe der Leistungspunkte in der Planung ausreicht.
   */
  check(
    studiengangVeranstaltungen: Veranstaltung[],
    belegung: Veranstaltung[]
  ): boolean {
    let lpBelegt = belegung.reduce(
      (sum: number, veranstaltung: Veranstaltung) => {
        return sum + veranstaltung.lp;
      },
      0
    );
    return lpBelegt >= this.minLP;
  }
}

export class MinWahlpflichtLPInModulRegel implements Regel {
  modul: Modul;
  mnemonicDesc: string;

  constructor(modul: Modul) {
    this.modul = modul;
    this.mnemonicDesc =
      "Es sind mindenstes " +
      this.modul.minWahlLP +
      " LP (Wahl) im Modul " +
      this.modul.name +
      " eingeplant.";
  }

  /**
   * Überprüft ob genug Leistungspunkt in nicht-pflicht-Veranstaltungen eines Moduls eingplant sind.
   */
  check(
    studiengangVeranstaltungen: Veranstaltung[],
    belegung: Veranstaltung[]
  ): boolean {
    let belegtInModul = belegung.filter(v => {
      return v.modul.id === this.modul.id && !v.isPflicht;
    });
    let belegtLPs = belegtInModul.reduce((sum, v) => {
      return sum + v.lp;
    }, 0);
    return belegtLPs >= this.modul.minWahlLP;
  }
}

export class MinVeranstaltungstypRegel implements Regel {
  typ: VeranstaltungsTyp;
  mnemonicDesc: string;

  constructor(typ: VeranstaltungsTyp) {
    this.typ = typ;
    this.mnemonicDesc =
      "Es ist mindestens " +
      this.typ.minBelegteVeranstaltungen +
      " " +
      this.typ.name +
      " eingeplant.";
  }

  /**
   * Überprüft ob genug Veranstaltungen eines bestimmten Typs belegt sind.
   */
  check(
    studiengangVeranstaltungen: Veranstaltung[],
    belegung: Veranstaltung[]
  ): boolean {
    let belegtInTyp = belegung.filter(v => {
      return v.typ === this.typ;
    });
    return belegtInTyp.length >= this.typ.minBelegteVeranstaltungen;
  }
}
