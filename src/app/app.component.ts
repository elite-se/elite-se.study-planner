import { Component } from "@angular/core";
import { Modul } from "./datatypes/veranstaltung";
import { StudiengangService } from "./services/studiengang.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  module: Modul[] = [];
  semester: number[] = [];

  constructor(private studiengangService: StudiengangService) {
    this.studiengangService.selectedStudiengangChange.subscribe(() => {
      this.module = this.studiengangService.module;
      this.semester = [
        ...Array(this.studiengangService.anzSemester).keys()
      ].map(x => ++x); //create array with numbers of the semesters in it and offset from starting zero for better readibility
    });
  }
}
