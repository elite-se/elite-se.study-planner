import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFontAwesomeModule } from "angular-font-awesome";

import { AppComponent } from "./app.component";
import { SemesterSwimLaneComponent } from "./components/semester-swim-lane/semester-swim-lane.component";
import { VeranstaltungCardComponent } from "./components/veranstaltung-card/veranstaltung-card.component";
import { HttpClientModule } from "@angular/common/http";
import { ModulCssClassPipe } from "./pipes/modul-css-class.pipe";
import { ModulVeranstaltungenComponent } from "./components/modul-veranstaltungen/modul-veranstaltungen.component";
import { RuleCheckerComponent } from "./components/rule-checker/rule-checker.component";

@NgModule({
  declarations: [
    AppComponent,
    SemesterSwimLaneComponent,
    VeranstaltungCardComponent,
    ModulCssClassPipe,
    ModulVeranstaltungenComponent,
    RuleCheckerComponent
  ],
  imports: [BrowserModule, HttpClientModule, AngularFontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
