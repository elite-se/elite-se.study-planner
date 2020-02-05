import { Component, OnInit, Input } from "@angular/core";
import { Regel } from "src/app/datatypes/studiegang";
import { StatefulRegel } from "src/app/app.component";

@Component({
  selector: "app-rule-checker",
  templateUrl: "./rule-checker.component.html",
  styleUrls: ["./rule-checker.component.scss"]
})
export class RuleCheckerComponent implements OnInit {
  @Input() regel: StatefulRegel;

  constructor() {}

  ngOnInit() {}
}
