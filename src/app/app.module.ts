import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from "./app.component";
import { SemesterSwimLaneComponent } from "./components/semester-swim-lane/semester-swim-lane.component";
import { VeranstaltungCardComponent } from "./components/veranstaltung-card/veranstaltung-card.component";
import { provideHttpClient } from "@angular/common/http";
import { ModulCssClassPipe } from "./pipes/modul-css-class.pipe";
import { ModulVeranstaltungenComponent } from "./components/modul-veranstaltungen/modul-veranstaltungen.component";
import { RegelnDisplayComponent } from "./components/regeln-display/regeln-display.component";
import { SaveBelegungComponent } from './components/save-belegung/save-belegung.component';
import { UploadSavedBelegungComponent } from './components/upload-saved-belegung/upload-saved-belegung.component';
import { NotificationsOverlayComponent } from './components/notifications-overlay/notifications-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    SemesterSwimLaneComponent,
    VeranstaltungCardComponent,
    ModulCssClassPipe,
    ModulVeranstaltungenComponent,
    RegelnDisplayComponent,
    SaveBelegungComponent,
    UploadSavedBelegungComponent,
    NotificationsOverlayComponent
  ],
  imports: [BrowserModule, FontAwesomeModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule {}
