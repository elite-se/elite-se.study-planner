import { Component, OnInit } from "@angular/core";
import {
  NotificationService,
  NotificationLevel,
} from "src/app/services/notification.service";

@Component({
  selector: "app-notifications-overlay",
  templateUrl: "./notifications-overlay.component.html",
  styleUrls: ["./notifications-overlay.component.scss"],
})
export class NotificationsOverlayComponent implements OnInit {
  iconName: string;
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
          this.iconName = "bomb";
          break;
        case NotificationLevel.WARNING:
          this.iconColorClass = "warning";
          this.iconName = "exclamation-circle";
          break;
        case NotificationLevel.INFO:
          this.iconColorClass = "info";
          this.iconName = "info-circle";
          break;
      }
      this.visible = true;
    });
  }

  close() {
    this.visible = false;
    this.messsage = null;
    this.iconName = null;
  }
}
