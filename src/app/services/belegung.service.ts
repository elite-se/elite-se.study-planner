import { Injectable, EventEmitter } from "@angular/core";
import { Veranstaltung } from "../datatypes/veranstaltung";
import { StudiengangService } from "./studiengang.service";

/**
 * Service that saves the currently selected Veranstaltungen (i.e. the Belegung).
 * Veranstaltungen can be added to or removed from the Belegung via this service.
 */

@Injectable({
  providedIn: "root",
})
export class BelegungService {
  belegteVeranstaltungenChange: EventEmitter<any>;
  public belegteVeranstaltungen: Veranstaltung[] = [];

  constructor(private studiengangService: StudiengangService) {
    console.log("Creating Belegungservice");
    this.belegteVeranstaltungenChange = new EventEmitter<any>();

    this.studiengangService.selectedStudiengangChange.subscribe(() => {
      console.log("Reacting to studiengang change.");
      this.loadPflichtVeranstaltungenFromStudiengang();
    });

    this.loadPflichtVeranstaltungenFromStudiengang();
  }

  private loadPflichtVeranstaltungenFromStudiengang() {
    console.log("Beleging Pflichtveranstaltungen from studiengang.");
    this.belegteVeranstaltungen = this.studiengangService.allVeranstaltungen.filter(
      (v) => {
        return v.isPflicht;
      }
    );
    this.belegteVeranstaltungenChange.emit();
  }

  /**
   * Adds a Veranstaltung to the Belegung. If it already is in the Belegung, nothing happens
   * @param v
   */
  addVeranstaltungToBelegung(v: Veranstaltung) {
    let idx = this.belegteVeranstaltungen.indexOf(v);
    if (idx < 0) {
      this.belegteVeranstaltungen.push(v);
      this.belegteVeranstaltungenChange.emit();
    }
  }

  removeVeranstaltungFromBelegung(v: Veranstaltung) {
    let idx = this.belegteVeranstaltungen.indexOf(v);
    if (idx >= 0) {
      this.belegteVeranstaltungen.splice(idx, 1);
      this.belegteVeranstaltungenChange.emit();
    }
  }

  getCurrentBelegungAsIDList(): number[] {
    return this.belegteVeranstaltungen.map((v) => v.id);
  }

  reloadBelegungFromIDList(ids: number[]) {
    const isInBelegung = (v: Veranstaltung) => {
      return ids.indexOf(v.id) >= 0;
    };

    this.belegteVeranstaltungen = this.studiengangService.allVeranstaltungen.filter(
      (v: Veranstaltung) => isInBelegung(v)
    );
    this.belegteVeranstaltungenChange.emit();
  }
}
