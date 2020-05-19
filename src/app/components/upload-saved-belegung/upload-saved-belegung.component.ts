import { Component, OnInit } from "@angular/core";
import { getLocaleFirstDayOfWeek } from "@angular/common";
import { BelegungService } from "src/app/services/belegung.service";

@Component({
  selector: "app-upload-saved-belegung",
  templateUrl: "./upload-saved-belegung.component.html",
  styleUrls: ["./upload-saved-belegung.component.scss"],
})
export class UploadSavedBelegungComponent implements OnInit {
  private hiddenFileInput: any;

  constructor(private belegungService: BelegungService) {}

  ngOnInit() {
    this.hiddenFileInput = document.createElement("input");
    this.hiddenFileInput.type = "file";
    this.hiddenFileInput.multiple = false;
    this.hiddenFileInput.accept = "application/json";
    this.hiddenFileInput.addEventListener("change", () => {
      console.log("Files changed", this.hiddenFileInput.files);
      if (this.hiddenFileInput.files.length > 0) {
        for (var i = 0; i < this.hiddenFileInput.files.length; i++) {
          try {
            let file = this.hiddenFileInput.files[i];
            const reader = new FileReader();
            reader.onload = () => {
              let belegungsList = JSON.parse(reader.result as string);

              //TODO: error checking!

              this.belegungService.reloadBelegungFromIDList(belegungsList);

              console.log("Belegung", belegungsList);
            };
            reader.readAsText(file);
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  }

  upload(event: any) {
    if (this.hiddenFileInput.click) {
      this.hiddenFileInput.click();
    } else if (this.hiddenFileInput.onclick) {
      this.hiddenFileInput.onclick(event);
    }
  }
}
