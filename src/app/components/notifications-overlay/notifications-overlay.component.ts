import { Component, OnInit } from "@angular/core";
import {
  NotificationService,
  NotificationLevel,
} from "src/app/services/notification.service";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBomb, faExclamationCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-notifications-overlay",
  templateUrl: "./notifications-overlay.component.html",
  styleUrls: ["./notifications-overlay.component.scss"],
  standalone: false,
})
export class NotificationsOverlayComponent implements OnInit {
  icon: IconDefinition;
  iconColorClass: string;
  title: string;
  messsage: string;

  visible: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notificationChanged.subscribe(() => {
      this.title = this.notificationService.currentTitle;
      this.messsage = this.notificationService.currentNotification;
      switch (this.notificationService.currentLevel) {
        case NotificationLevel.ERROR:
          this.iconColorClass = "error";
          this.icon = faBomb;
          break;
        case NotificationLevel.WARNING:
          this.iconColorClass = "warning";
          this.icon = faExclamationCircle;
          break;
        case NotificationLevel.INFO:
          this.iconColorClass = "info";
          this.icon = faInfoCircle;
          break;
      }
      this.visible = true;
    });
  }

  close() {
    this.visible = false;
    this.messsage = null;
    this.icon = null;
  }
}
