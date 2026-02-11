import { Component, OnInit } from "@angular/core";
import { BelegungService } from "src/app/services/belegung.service";
import { NotificationService } from "src/app/services/notification.service";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-upload-saved-belegung",
  templateUrl: "./upload-saved-belegung.component.html",
  styleUrls: ["./upload-saved-belegung.component.scss"],
  standalone: false,
})
export class UploadSavedBelegungComponent implements OnInit {
  private hiddenFileInput: any;
  faUpload = faUpload;

  constructor(
    private belegungService: BelegungService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.hiddenFileInput = document.createElement("input");
    this.hiddenFileInput.type = "file";
    this.hiddenFileInput.multiple = false;
    this.hiddenFileInput.accept = ".json,application/json";
    this.hiddenFileInput.addEventListener("change", () => {
      console.log("Files changed", this.hiddenFileInput.files);
      if (this.hiddenFileInput.files.length > 0) {
        for (var i = 0; i < this.hiddenFileInput.files.length; i++) {
          let file = this.hiddenFileInput.files[i];
          const reader = new FileReader();
          reader.onload = () => {
            let belegungsList;
            try {
              belegungsList = JSON.parse(reader.result as string);
            } catch (error) {
              this.notificationService.postError(
                "Fehlerhafte Datei",
                "Die hochgeladene Datei scheint keine gültige '.json' Datei zu sein! Stelle sicher, dass Du nur Dateien hochlädst, die Du vorher vom StudyPlanner runtergeladen hast."
              );
              return;
            }

            if (!Array.isArray(belegungsList)) {
              this.notificationService.postWarning(
                "Fehlerhafter Dateiinhalt",
                "Der Inhalt der hochgeladenen Datei entspricht nicht dem erwarteten Format. Es wird eine Liste von Veranstaltungs-IDs erwartet. Stelle sicher, dass Du nur Dateien hochlädst, die Du vorher vom StudyPlanner runtergeladen hast."
              );
              return;
            }

            if (belegungsList.length == 0) {
              this.notificationService.postWarning(
                "Keine Vorlesungen in Datei gefunden",
                "Die hochgeladene Datei enthielt keine Vorlesungen. Die aktuelle Belegung wird beibehalten."
              );
              return;
            }

            this.belegungService.reloadBelegungFromIDList(belegungsList);

            this.notificationService.postInfo(
              "Belegung erfolgreich geladen",
              "Die Belegung wurde erfolgreich aus der hochgeladenen Datei geladen."
            );
          };

          //reset file input so change event is always fired; even if the same file is selected
          this.hiddenFileInput.value = null;

          reader.readAsText(file);
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
