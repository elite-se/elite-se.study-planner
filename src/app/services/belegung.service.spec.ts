import { TestBed } from "@angular/core/testing";
import { EventEmitter } from "@angular/core";
import {
  BelegungService,
  BELEGUNG_STORAGE_KEY,
} from "./belegung.service";
import { StudiengangService } from "./studiengang.service";
import { Veranstaltung } from "../datatypes/veranstaltung";

describe("BelegungService Persistence", () => {
  let service: BelegungService;
  let mockStudiengangService: any;
  let mockChangeEmitter: EventEmitter<any>;

  const mockVeranstaltungen: Veranstaltung[] = [
    {
      id: 1,
      typ: { name: "Vorlesung", minBelegteVeranstaltungen: 1 },
      titel: "Mandatory Course 1",
      kuerzel: "MC1",
      lp: 6,
      beschreibung: "",
      schlagworte: [],
      links: [],
      Prof: "Prof A",
      Uni: "Uni",
      isPflicht: true,
      isBlock: false,
      modul: { id: 1, name: "Modul 1", minWahlLP: 0 },
      semester: 1,
    },
    {
      id: 2,
      typ: { name: "Vorlesung", minBelegteVeranstaltungen: 1 },
      titel: "Elective Course 2",
      kuerzel: "EC2",
      lp: 6,
      beschreibung: "",
      schlagworte: [],
      links: [],
      Prof: "Prof B",
      Uni: "Uni",
      isPflicht: false,
      isBlock: false,
      modul: { id: 1, name: "Modul 1", minWahlLP: 0 },
      semester: 2,
    },
    {
      id: 3,
      typ: { name: "Vorlesung", minBelegteVeranstaltungen: 1 },
      titel: "Elective Course 3",
      kuerzel: "EC3",
      lp: 6,
      beschreibung: "",
      schlagworte: [],
      links: [],
      Prof: "Prof C",
      Uni: "Uni",
      isPflicht: false,
      isBlock: false,
      modul: { id: 2, name: "Modul 2", minWahlLP: 0 },
      semester: 3,
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    mockChangeEmitter = new EventEmitter<any>();
    mockStudiengangService = {
      selectedStudiengangChange: mockChangeEmitter,
      allVeranstaltungen: mockVeranstaltungen,
    };

    TestBed.configureTestingModule({
      providers: [
        BelegungService,
        { provide: StudiengangService, useValue: mockStudiengangService },
      ],
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should initialize with mandatory courses and persist them if localStorage is empty", () => {
    service = TestBed.inject(BelegungService);

    expect(service.belegteVeranstaltungen.length).toBe(1);
    expect(service.belegteVeranstaltungen[0].id).toBe(1);

    const saved = JSON.parse(localStorage.getItem(BELEGUNG_STORAGE_KEY) || "[]");
    expect(saved).toEqual([1]);
  });

  it("should restore belegung from localStorage on startup if valid data exists", () => {
    localStorage.setItem(BELEGUNG_STORAGE_KEY, JSON.stringify([1, 2]));

    service = TestBed.inject(BelegungService);

    expect(service.belegteVeranstaltungen.length).toBe(2);
    expect(service.getCurrentBelegungAsIDList()).toEqual([1, 2]);
  });

  it("should update localStorage when adding a course", () => {
    service = TestBed.inject(BelegungService);

    service.addVeranstaltungToBelegung(mockVeranstaltungen[1]);

    expect(service.belegteVeranstaltungen.length).toBe(2);
    const saved = JSON.parse(localStorage.getItem(BELEGUNG_STORAGE_KEY) || "[]");
    expect(saved).toEqual([1, 2]);
  });

  it("should update localStorage when removing a course", () => {
    localStorage.setItem(BELEGUNG_STORAGE_KEY, JSON.stringify([1, 2]));
    service = TestBed.inject(BelegungService);

    service.removeVeranstaltungFromBelegung(mockVeranstaltungen[1]);

    expect(service.belegteVeranstaltungen.length).toBe(1);
    const saved = JSON.parse(localStorage.getItem(BELEGUNG_STORAGE_KEY) || "[]");
    expect(saved).toEqual([1]);
  });

  it("should update localStorage when reloading from ID list (e.g. upload)", () => {
    service = TestBed.inject(BelegungService);

    service.reloadBelegungFromIDList([1, 3]);

    expect(service.getCurrentBelegungAsIDList()).toEqual([1, 3]);
    const saved = JSON.parse(localStorage.getItem(BELEGUNG_STORAGE_KEY) || "[]");
    expect(saved).toEqual([1, 3]);
  });

  it("should reset belegung to mandatory courses and update localStorage on reset", () => {
    localStorage.setItem(BELEGUNG_STORAGE_KEY, JSON.stringify([1, 2, 3]));
    service = TestBed.inject(BelegungService);

    expect(service.getCurrentBelegungAsIDList()).toEqual([1, 2, 3]);

    service.resetBelegung();

    expect(service.getCurrentBelegungAsIDList()).toEqual([1]);
    const saved = JSON.parse(localStorage.getItem(BELEGUNG_STORAGE_KEY) || "[]");
    expect(saved).toEqual([1]);
  });
});
