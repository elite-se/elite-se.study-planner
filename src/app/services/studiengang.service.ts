import { Injectable, Output, EventEmitter } from "@angular/core";
import { Studiengang, Regel, StudiengangData } from "../datatypes/studiegang";
import { Veranstaltung, Modul } from "../datatypes/veranstaltung";
import { BackendConnectionService } from "./backend-connection.service";
import { StudiengangSE14 } from "../classes/studiengangSE14";

/**
 * Service that holds the currently selected Studiengang.
 * As of now only MasterSE14 is supported but this could be
 * extended to support more than one Studiengang, once the
 * backend provides that data.
 */

@Injectable({
  providedIn: "root"
})
export class StudiengangService {
  private selectedStudiengang: Studiengang;

  @Output() selectedStudiengangChange: EventEmitter<any>;

  constructor(private backendConnection: BackendConnectionService) {
    this.selectedStudiengangChange = new EventEmitter<any>();
    this.backendConnection
      .getStudiengangSE14()
      .subscribe((studiengangData: StudiengangData) => {
        console.log("Got SE14 Studiengangdata", studiengangData);
        this.selectedStudiengang = new StudiengangSE14(studiengangData);
        console.log("Emitting studiengang change");
        this.selectedStudiengangChange.emit();
      });
  }

  get module(): Modul[] {
    return this.selectedStudiengang.module;
  }

  get regeln(): Regel[] {
    return this.selectedStudiengang.regeln;
  }

  get allVeranstaltungen(): Veranstaltung[] {
    if (!this.selectedStudiengang) return [];
    return this.selectedStudiengang.veranstaltungen;
  }

  get anzSemester(): number {
    return this.selectedStudiengang.semester;
  }

  get studiengangName(): string {
    return this.selectedStudiengang.name;
  }
}
