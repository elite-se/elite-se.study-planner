import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFontAwesomeModule } from "angular-font-awesome";

import { AppComponent } from "./app.component";
import { SemesterSwimLaneComponent } from "./components/semester-swim-lane/semester-swim-lane.component";
import { VeranstaltungCardComponent } from "./components/veranstaltung-card/veranstaltung-card.component";
import { HttpClientModule } from "@angular/common/http";
import { ModulCssClassPipe } from "./pipes/modul-css-class.pipe";
import { ModulVeranstaltungenComponent } from "./components/modul-veranstaltungen/modul-veranstaltungen.component";
import { RegelnDisplayComponent } from "./components/regeln-display/regeln-display.component";
import { SaveBelegungComponent } from './components/save-belegung/save-belegung.component';
import { UploadSavedBelegungComponent } from './components/upload-saved-belegung/upload-saved-belegung.component';

@NgModule({
  declarations: [
    AppComponent,
    SemesterSwimLaneComponent,
    VeranstaltungCardComponent,
    ModulCssClassPipe,
    ModulVeranstaltungenComponent,
    RegelnDisplayComponent,
    SaveBelegungComponent,
    UploadSavedBelegungComponent
  ],
  imports: [BrowserModule, HttpClientModule, AngularFontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
