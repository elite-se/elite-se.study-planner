import { Component, OnInit, Input } from "@angular/core";
import {
  RegelCheckerService,
  RegelForDisplay
} from "src/app/services/regel-checker.service";

@Component({
  selector: "app-regeln-display",
  templateUrl: "./regeln-display.component.html",
  styleUrls: ["./regeln-display.component.scss"]
})
export class RegelnDisplayComponent implements OnInit {
  regelnForDisplay: RegelForDisplay[] = [];
  passedRegelnCount: number = 0;
  allRegelnPassedFlag: boolean = false;

  regelnHidden: boolean = true;

  constructor(private regelCheckerService: RegelCheckerService) {}

  ngOnInit() {
    this.regelCheckerService.regelnChange.subscribe(() => {
      this.updateRegelDisplays();
    });

    this.updateRegelDisplays();
  }

  toggleRegelnHidden() {
    this.regelnHidden = !this.regelnHidden;
  }

  private updateRegelDisplays() {
    this.regelnForDisplay = this.regelCheckerService.regelnForDisplay;
    this.passedRegelnCount = this.regelCheckerService.passedRegelnCount;
    this.allRegelnPassedFlag = this.regelCheckerService.allRegelnPassedFlag;
  }
}
