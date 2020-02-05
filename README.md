# SE - Planner

Kleine App, die uns SE-lern die Studienplanung ein wenig erleichtern soll. Im jetzigen Zustand sind die Studiengangsinformationen und Regeln bzgl. Mindest-LP's in Modulen, etc. nicht zur Laufzeit konfigurierbar, d.h. die App ist nur für unseren Jahrgang wirklich sinnvoll.

# Roadmap

- Detailbeschreibungen der Veranstaltungen integrieren
- Vorgängerabhängigkeiten zwischen Veranstaltungen integrieren
- Export der gewählten Belegung als json/Excel/CSV/... (Vorschläge erbeten)
- Import von Studiengangs- und Vorlesungsinformationen als json File(s)
- Generisches Design für Regeln (zB Mindestanz. Punkte in einem Modul) plus GUI zum erstellen solcher Regeln
- Backend mit Datenbank für Studiengänge

# Setup / Benutzung

- Repo clonen
- Ins Repo Verzeichnis cd'en
- `ng serve`
- `localhost:4200` im Browser aufrufen
