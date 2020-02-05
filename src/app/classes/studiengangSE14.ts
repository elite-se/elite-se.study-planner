import { Studiengang, Regel, StudiengangData } from "../datatypes/studiegang";
import {
  Veranstaltung,
  Modul,
  VeranstaltungsTyp
} from "../datatypes/veranstaltung";
import {
  AllePflichtRegel,
  MinLPRegel,
  MinWahlpflichtLPInModulRegel,
  MinVeranstaltungstypRegel
} from "../datatypes/rules/se14-regeln";

export class StudiengangSE14 implements Studiengang {
  name: string;
  semester: number;
  minLP: number;
  module: Modul[];
  veranstaltungstypen: VeranstaltungsTyp[];
  veranstaltungen: Veranstaltung[];
  regeln: Regel[];

  constructor(data: StudiengangData) {
    this.name = data.name;
    this.semester = data.semester;
    this.minLP = data.minLP;
    this.module = data.module;
    this.veranstaltungstypen = data.veranstaltungstypen;
    this.veranstaltungen = data.veranstaltungen;
    this.regeln = [];
    this.regeln.push(new AllePflichtRegel());
    this.regeln.push(new MinLPRegel(this.minLP));
    for (let modul of this.module) {
      if (modul.minWahlLP > 0) {
        this.regeln.push(new MinWahlpflichtLPInModulRegel(modul));
      }
    }

    for (let typ of this.veranstaltungstypen) {
      if (typ.minBelegteVeranstaltungen > 0) {
        this.regeln.push(new MinVeranstaltungstypRegel(typ));
      }
    }
  }
}
