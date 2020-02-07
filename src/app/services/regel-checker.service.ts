import { Injectable, Output, EventEmitter } from "@angular/core";
import { StudiengangService } from "./studiengang.service";
import { BelegungService } from "./belegung.service";
import { Regel } from "../datatypes/studiegang";

/**
 * Service that gets the regeln from a Studiengang and checks them each time the Belegung changes.
 * Saves the result of those checks so components can display these results.
 */

interface RegelChecker {
  regel: Regel;
  lastState: boolean;
}

export interface RegelForDisplay {
  message: string;
  state: boolean;
}

@Injectable({
  providedIn: "root"
})
export class RegelCheckerService {
  private regelCheckers: RegelChecker[];

  private _regelnForDisplay: RegelForDisplay[];
  public get regelnForDisplay(): RegelForDisplay[] {
    if (!this._regelnForDisplay) return [];
    return this.deepCopy(this._regelnForDisplay);
  }
  public allRegelnPassedFlag: boolean = false;
  public get passedRegelnCount(): number {
    if (!this.regelCheckers) return 0;
    return this.regelCheckers.filter(r => {
      return r.lastState;
    }).length;
  }

  @Output() regelnChange: EventEmitter<any>;

  constructor(
    private studiengangService: StudiengangService,
    private belegungService: BelegungService
  ) {
    this.regelnChange = new EventEmitter<any>();

    this.studiengangService.selectedStudiengangChange.subscribe(() => {
      this.initializeWithNewRegeln(this.studiengangService.regeln);
      this.pruefeRegeln();
    });

    this.belegungService.belegteVeranstaltungenChange.subscribe(() => {
      if (this.regelCheckers) this.pruefeRegeln();
    });
  }

  /**
   * Initializes the regelCheckers with new regeln to a default state of false.
   * Initializes the regelMessages with the failure messages of the new regeln.
   * @param newRegeln
   */
  private initializeWithNewRegeln(newRegeln: Regel[]) {
    this.regelCheckers = [];
    this._regelnForDisplay = [];

    for (let newRegel of newRegeln) {
      this.regelCheckers.push({
        regel: newRegel,
        lastState: false
      });
      this._regelnForDisplay.push({
        message: newRegel.mnemonicDescFailure,
        state: false
      });
    }
    this.regelnChange.emit();
  }

  private pruefeRegeln() {
    console.log("Checking all rules");

    let checkAccumulator = true;

    for (let i = 0; i < this.regelCheckers.length; i++) {
      let regelChecker = this.regelCheckers[i];
      regelChecker.lastState = regelChecker.regel.check(
        this.studiengangService.allVeranstaltungen,
        this.belegungService.belegteVeranstaltungen
      );
      this._regelnForDisplay[i].state = regelChecker.lastState;
      this._regelnForDisplay[i].message = regelChecker.lastState
        ? regelChecker.regel.mnemonicDescSuccess
        : regelChecker.regel.mnemonicDescFailure;

      checkAccumulator = checkAccumulator && regelChecker.lastState;

      if (!regelChecker.lastState) {
        console.log("Check failed");
      } else {
        console.log("Check passed");
      }
    }
    this.allRegelnPassedFlag = checkAccumulator;
    this.regelnChange.emit();
  }

  private deepCopy(value: any): any {
    return JSON.parse(JSON.stringify(value));
  }
}
