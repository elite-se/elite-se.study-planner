import { Injectable, EventEmitter, Output } from "@angular/core";

export enum NotificationLevel {
  ERROR,
  WARNING,
  INFO,
}

/**
 * Service that stores notification messages.
 * The messages are shown on screen by the NotificationsOverlayComponent
 */

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  currentLevel: NotificationLevel;
  currentNotification: string;
  @Output() notificationChanged: EventEmitter<any>;

  constructor() {
    this.notificationChanged = new EventEmitter<any>();
  }

  postError(message: string) {
    this.setNewMessage(message, NotificationLevel.ERROR);
  }

  postWarning(message: string) {
    this.setNewMessage(message, NotificationLevel.WARNING);
  }

  postInfo(message: string) {
    this.setNewMessage(message, NotificationLevel.INFO);
  }

  private setNewMessage(message: string, level: NotificationLevel) {
    this.currentLevel = level;
    this.currentNotification = message;
    this.notificationChanged.emit();
  }
}
