import { Component, OnInit, Input } from "@angular/core";
import {
  Modul,
  Veranstaltung,
  VeranstaltungsTyp
} from "src/app/datatypes/veranstaltung";
import { StudiengangService } from "src/app/services/studiengang.service";
import { BelegungService } from "src/app/services/belegung.service";

@Component({
  selector: "app-modul-veranstaltungen",
  templateUrl: "./modul-veranstaltungen.component.html",
  styleUrls: ["./modul-veranstaltungen.component.scss"]
})
export class ModulVeranstaltungenComponent implements OnInit {
  _modul: Modul;
  @Input() set modul(modulIn: Modul) {
    this._modul = modulIn;
    this.reloadVeranstaltungen();
  }

  modulVeranstaltungen: Veranstaltung[];

  constructor(
    private studienGangService: StudiengangService,
    private belegungService: BelegungService
  ) {}

  ngOnInit() {
    this.studienGangService.selectedStudiengangChange.subscribe(() =>
      this.reloadVeranstaltungen()
    );
    this.belegungService.belegteVeranstaltungenChange.subscribe(() =>
      this.reloadVeranstaltungen()
    );
  }

  reloadVeranstaltungen() {
    let belegteVeranstaltungenInModul = this.belegungService.belegteVeranstaltungen.filter(
      (v: Veranstaltung) => {
        return v.modul.id === this._modul.id;
      }
    );
    this.modulVeranstaltungen = this.studienGangService.allVeranstaltungen.filter(
      (v: Veranstaltung) => {
        return (
          v.modul.id === this._modul.id &&
          !this.veranstaltungInList(v, belegteVeranstaltungenInModul)
        );
      }
    );
  }

  handleClick(v: Veranstaltung) {
    this.belegungService.addVeranstaltungToBelegung(v);
  }

  private veranstaltungInList(
    v: Veranstaltung,
    vList: Veranstaltung[]
  ): boolean {
    for (let checkV of vList) {
      if (v.id === checkV.id) return true;
    }
    return false;
  }
}
