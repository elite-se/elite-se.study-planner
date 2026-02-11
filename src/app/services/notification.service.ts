import { Injectable, EventEmitter } from "@angular/core";

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
  currentTitle: string;
  notificationChanged: EventEmitter<any>;

  constructor() {
    this.notificationChanged = new EventEmitter<any>();
  }

  postError(title: string, message: string) {
    this.setNewMessage(title, message, NotificationLevel.ERROR);
  }

  postWarning(title: string, message: string) {
    this.setNewMessage(title, message, NotificationLevel.WARNING);
  }

  postInfo(title: string, message: string) {
    this.setNewMessage(title, message, NotificationLevel.INFO);
  }

  private setNewMessage(
    title: string,
    message: string,
    level: NotificationLevel
  ) {
    this.currentLevel = level;
    this.currentTitle = title;
    this.currentNotification = message;
    this.notificationChanged.emit();
  }
}
