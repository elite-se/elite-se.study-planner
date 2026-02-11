import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Veranstaltung } from "../datatypes/veranstaltung";

@Injectable({
  providedIn: "root"
})
export class BackendConnectionService {
  constructor(private http: HttpClient) {}

  getStudiengangSE14(): Observable<any> {
    return this.http.get("assets/data/studiengang_se14.json");
  }
}
