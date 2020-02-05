import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Veranstaltung } from "src/app/datatypes/veranstaltung";

@Component({
  selector: "app-veranstaltung-card",
  templateUrl: "./veranstaltung-card.component.html",
  styleUrls: ["./veranstaltung-card.component.scss"]
})
export class VeranstaltungCardComponent implements OnInit {
  @Input() veranstaltung: Veranstaltung;
  @Input() isMini: boolean = false;

  @Output() delete: EventEmitter<any>;

  constructor() {
    this.delete = new EventEmitter<any>();
  }

  ngOnInit() {}

  onXClicked() {
    this.delete.emit();
  }
}
