import { Injectable, EventEmitter } from "@angular/core";
import { Veranstaltung } from "../datatypes/veranstaltung";
import { StudiengangService } from "./studiengang.service";

export const BELEGUNG_STORAGE_KEY = "study_planner_belegung";

/**
 * Service that saves the currently selected Veranstaltungen (i.e. the Belegung).
 * Veranstaltungen can be added to or removed from the Belegung via this service.
 * Automatically persists the current Belegung to browser localStorage.
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
      this.loadInitialBelegung();
    });

    this.loadInitialBelegung();
  }

  private loadInitialBelegung(): void {
    if (
      !this.studiengangService.allVeranstaltungen ||
      this.studiengangService.allVeranstaltungen.length === 0
    ) {
      return;
    }

    const savedIds = this.loadSavedBelegungFromLocalStorage();
    if (savedIds && savedIds.length > 0) {
      this.reloadBelegungFromIDList(savedIds);
    } else {
      this.loadPflichtVeranstaltungenFromStudiengang();
      this.persistCurrentBelegung();
    }
  }

  private loadPflichtVeranstaltungenFromStudiengang(): void {
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
  addVeranstaltungToBelegung(v: Veranstaltung): void {
    let idx = this.belegteVeranstaltungen.indexOf(v);
    if (idx < 0) {
      this.belegteVeranstaltungen.push(v);
      this.belegteVeranstaltungenChange.emit();
      this.persistCurrentBelegung();
    }
  }

  removeVeranstaltungFromBelegung(v: Veranstaltung): void {
    let idx = this.belegteVeranstaltungen.indexOf(v);
    if (idx >= 0) {
      this.belegteVeranstaltungen.splice(idx, 1);
      this.belegteVeranstaltungenChange.emit();
      this.persistCurrentBelegung();
    }
  }

  getCurrentBelegungAsIDList(): number[] {
    return this.belegteVeranstaltungen.map((v) => v.id);
  }

  reloadBelegungFromIDList(ids: number[]): void {
    const isInBelegung = (v: Veranstaltung) => {
      return v.isPflicht || ids.indexOf(v.id) >= 0;
    };

    this.belegteVeranstaltungen = this.studiengangService.allVeranstaltungen.filter(
      (v: Veranstaltung) => isInBelegung(v)
    );
    this.belegteVeranstaltungenChange.emit();
    this.persistCurrentBelegung();
  }

  /**
   * Resets the Belegung to the default state (mandatory courses only)
   * and updates localStorage.
   */
  resetBelegung(): void {
    this.loadPflichtVeranstaltungenFromStudiengang();
    this.persistCurrentBelegung();
  }

  private getStorage(): Storage | null {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage;
      }
    } catch (e) {
      console.warn("localStorage is unavailable:", e);
    }
    return null;
  }

  private loadSavedBelegungFromLocalStorage(): number[] | null {
    const storage = this.getStorage();
    if (!storage) {
      return null;
    }

    try {
      const rawData = storage.getItem(BELEGUNG_STORAGE_KEY);
      if (!rawData) {
        return null;
      }
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed) && parsed.every((id) => typeof id === "number")) {
        return parsed;
      }
    } catch (e) {
      console.warn("Could not load belegung from localStorage:", e);
    }
    return null;
  }

  private persistCurrentBelegung(): void {
    const storage = this.getStorage();
    if (!storage) {
      return;
    }

    try {
      const ids = this.getCurrentBelegungAsIDList();
      storage.setItem(BELEGUNG_STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.warn("Could not save belegung to localStorage:", e);
    }
  }
}
