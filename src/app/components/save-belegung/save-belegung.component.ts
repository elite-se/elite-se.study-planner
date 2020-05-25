import { Component, OnInit } from "@angular/core";
import { BelegungService } from "src/app/services/belegung.service";

@Component({
  selector: "app-save-belegung",
  templateUrl: "./save-belegung.component.html",
  styleUrls: ["./save-belegung.component.scss"],
})
export class SaveBelegungComponent implements OnInit {
  constructor(private belegungService: BelegungService) {}

  ngOnInit() {}

  downloadCurrentBelegung(): void {
    let belegungsJSON = JSON.stringify(
      this.belegungService.getCurrentBelegungAsIDList()
    );
    let a = document.createElement("a");
    let file = new Blob([belegungsJSON], { type: "application/json" });
    a.href = URL.createObjectURL(file);
    a.download = this.generateFileName();
    a.click();
    URL.revokeObjectURL(a.href);
  }

  private generateFileName(): string {
    let date = new Date();

    let hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
    let min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    let sec = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let monthStr = (month < 10 ? "0" : "") + month;
    let day = (date.getDate() < 10 ? "0" : "") + date.getDate();

    return (
      "SEBelegung_" +
      year +
      "" +
      monthStr +
      "" +
      day +
      "-" +
      hour +
      "" +
      min +
      "" +
      sec +
      ".json"
    );
  }
}
