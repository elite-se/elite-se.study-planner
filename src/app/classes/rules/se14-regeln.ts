import { Regel, Studiengang } from "../../datatypes/studiegang";
import {
  Veranstaltung,
  Modul,
  VeranstaltungsTyp
} from "../../datatypes/veranstaltung";

export class AllePflichtRegel implements Regel {
  mnemonicDescSuccess = "Alle Pflichtveranstaltungen sind eingeplant.";
  mnemonicDescFailure = "Es sind nicht alle Pflichtveranstaltungen eingeplant.";

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
    for (let pflicht of pflichtVeranstaltungen) {
      let belegt = false;
      for (let geplant of belegung) {
        if (pflicht.id === geplant.id) {
          belegt = true;
        }
      }
      if (!belegt) {
        return false;
      }
    }
    return true;
  }
}

export class MinLPRegel implements Regel {
  minLP: number;
  mnemonicDescSuccess: string;
  mnemonicDescFailure: string;

  constructor(minLP: number) {
    this.minLP = minLP;
    this.mnemonicDescSuccess = "mind. " + this.minLP + " LP sind eingeplant.";
    this.mnemonicDescFailure =
      "Es sind zu wenig LP eingeplant (" + this.minLP + " benötigt).";
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
  mnemonicDescSuccess: string;
  mnemonicDescFailure: string;

  constructor(modul: Modul) {
    this.modul = modul;
    this.mnemonicDescSuccess =
      "Es " +
      (this.modul.minWahlLP === 1 ? "ist" : "sind") +
      " mind. " +
      this.modul.minWahlLP +
      " LP (Wahl) im Modul " +
      this.modul.name +
      " eingeplant.";

    this.mnemonicDescFailure =
      "Es " +
      (this.modul.minWahlLP === 1 ? "muss" : "müssen") +
      " mind. " +
      this.modul.minWahlLP +
      " LP (Wahl) im Modul " +
      this.modul.name +
      " eingeplant werden.";
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
  mnemonicDescSuccess: string;
  mnemonicDescFailure: string;

  constructor(typ: VeranstaltungsTyp) {
    this.typ = typ;
    this.mnemonicDescSuccess =
      "Es " +
      (this.typ.minBelegteVeranstaltungen === 1 ? "ist" : "sind") +
      " mind. " +
      this.typ.minBelegteVeranstaltungen +
      " " +
      this.typ.name +
      " eingeplant.";

    this.mnemonicDescFailure =
      "Es " +
      (this.typ.minBelegteVeranstaltungen === 1 ? "muss" : "müssen") +
      " mind. " +
      this.typ.minBelegteVeranstaltungen +
      " " +
      this.typ.name +
      " eingeplant werden.";
  }

  /**
   * Überprüft ob genug Veranstaltungen eines bestimmten Typs belegt sind.
   */
  check(
    studiengangVeranstaltungen: Veranstaltung[],
    belegung: Veranstaltung[]
  ): boolean {
    let belegtInTyp = belegung.filter(v => {
      return v.typ.name === this.typ.name;
    });
    return belegtInTyp.length >= this.typ.minBelegteVeranstaltungen;
  }
}
