import { Component, OnInit, Input } from "@angular/core";
import {
  RegelCheckerService,
  RegelForDisplay
} from "src/app/services/regel-checker.service";
import { BelegungService } from 'src/app/services/belegung.service';
import { Veranstaltung, Modul } from 'src/app/datatypes/veranstaltung';
import { calculateEinbringbareLPSum } from 'src/app/util/utils';
import { StudiengangService } from 'src/app/services/studiengang.service';

@Component({
  selector: "app-regeln-display",
  templateUrl: "./regeln-display.component.html",
  styleUrls: ["./regeln-display.component.scss"]
})
export class RegelnDisplayComponent implements OnInit {
  regelnForDisplay: RegelForDisplay[] = [];
  passedRegelnCount: number = 0;
  allRegelnPassedFlag: boolean = false;

  einbringbareLPCount: number = 0;
  module: Modul[] = [];

  regelnHidden: boolean = true;

  constructor(private regelCheckerService: RegelCheckerService, private belegungService: BelegungService, private studienGangService: StudiengangService) { }

  ngOnInit() {
    this.studienGangService.selectedStudiengangChange.subscribe(() => {
      this.module = this.studienGangService.module;
      this.updateEinbringbareLPCount();
    })

    this.regelCheckerService.regelnChange.subscribe(() => {
      this.updateRegelDisplays();
    });

    this.belegungService.belegteVeranstaltungenChange.subscribe(() => {
      this.updateEinbringbareLPCount();
    })

    this.updateRegelDisplays();
    this.updateEinbringbareLPCount();
  }

  toggleRegelnHidden() {
    this.regelnHidden = !this.regelnHidden;
  }

  private updateRegelDisplays() {
    this.regelnForDisplay = this.regelCheckerService.regelnForDisplay;
    this.passedRegelnCount = this.regelCheckerService.passedRegelnCount;
    this.allRegelnPassedFlag = this.regelCheckerService.allRegelnPassedFlag;
  }

  private updateEinbringbareLPCount(): void {
    const belegung = this.belegungService.belegteVeranstaltungen;
    this.einbringbareLPCount = calculateEinbringbareLPSum(belegung, this.module);
  }
}
