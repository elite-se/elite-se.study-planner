import { Component, OnInit, Input } from "@angular/core";
import { StudiengangService } from "src/app/services/studiengang.service";
import { Veranstaltung } from "src/app/datatypes/veranstaltung";
import { BelegungService } from "src/app/services/belegung.service";

/**
 * Component that shows all selected Veranstaltungen in a semester
 */

@Component({
  selector: "app-semester-swim-lane",
  templateUrl: "./semester-swim-lane.component.html",
  styleUrls: ["./semester-swim-lane.component.scss"]
})
export class SemesterSwimLaneComponent implements OnInit {
  _semesterNr: number = 0;
  @Input() set semesterNr(semesterNr) {
    this._semesterNr = semesterNr;
    this.updateVisibleVorlesungen();
  }

  veranstaltungenInSemester: Veranstaltung[];

  constructor(private belegungService: BelegungService) {}

  ngOnInit() {
    this.belegungService.belegteVeranstaltungenChange.subscribe(() => {
      this.updateVisibleVorlesungen();
    });
    this.updateVisibleVorlesungen();
  }

  updateVisibleVorlesungen() {
    this.veranstaltungenInSemester = this.belegungService.belegteVeranstaltungen.filter(
      v => {
        return v.semester === this._semesterNr;
      }
    );
  }

  onDeleteVeranstaltung(v: Veranstaltung) {
    this.belegungService.removeVeranstaltungFromBelegung(v);
  }

  getVeranstaltungsCardWidthCssClass(veranstaltung: Veranstaltung): string {
    if (!veranstaltung) return "";

    let cssClass = "size-";
    if (veranstaltung.lp >= 20) {
      cssClass += "full-row";
    } else if (veranstaltung.lp >= 10) {
      cssClass += "big";
    } else {
      cssClass += veranstaltung.lp;
    }
    return cssClass;
  }
}
