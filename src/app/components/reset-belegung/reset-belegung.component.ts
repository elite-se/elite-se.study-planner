import { Component } from "@angular/core";
import { BelegungService } from "src/app/services/belegung.service";
import { NotificationService } from "src/app/services/notification.service";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-reset-belegung",
  templateUrl: "./reset-belegung.component.html",
  styleUrls: ["./reset-belegung.component.scss"],
  standalone: false,
})
export class ResetBelegungComponent {
  faRotateLeft = faRotateLeft;
  showConfirmModal = false;

  constructor(
    private belegungService: BelegungService,
    private notificationService: NotificationService
  ) {}

  openConfirmModal(): void {
    this.showConfirmModal = true;
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
  }

  confirmReset(): void {
    this.showConfirmModal = false;
    this.belegungService.resetBelegung();
    this.notificationService.postInfo(
      "Belegung zurückgesetzt",
      "Die Belegung wurde erfolgreich auf die Standard-Pflichtveranstaltungen zurückgesetzt."
    );
  }
}
