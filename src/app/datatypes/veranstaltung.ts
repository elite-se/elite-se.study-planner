import { HyperLink } from "./misc-types";

export interface Veranstaltung {
  id: number;
  typ: VeranstaltungsTyp;
  titel: string;
  kuerzel: string;
  lp: number;
  beschreibung: string;
  schlagworte: string[];
  links: HyperLink[];
  Prof: string;
  Uni: string;
  isPflicht: boolean;
  isBlock: boolean;
  modul: Modul;
  semester: number;
}

export interface Modul {
  id: number;
  name: string;
  minWahlLP: number;
  maxEinbringLP?: number;
}

export interface VeranstaltungsTyp {
  name: string;
  minBelegteVeranstaltungen: number;
}
