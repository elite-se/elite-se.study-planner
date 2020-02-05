import { Veranstaltung, Modul, VeranstaltungsTyp } from "./veranstaltung";

export interface Studiengang {
  name: string;
  semester: number;
  minLP: number;
  module: Modul[];
  veranstaltungstypen: VeranstaltungsTyp[];
  veranstaltungen: Veranstaltung[];
  regeln: Regel[];
}

export interface StudiengangData {
  name: string;
  semester: number;
  minLP: number;
  module: Modul[];
  veranstaltungstypen: VeranstaltungsTyp[];
  veranstaltungen: Veranstaltung[];
}

export interface Regel {
  mnemonicDesc: string;
  check: (
    studiengangVeranstaltungen: Veranstaltung[],
    planung: Veranstaltung[]
  ) => boolean;
}
