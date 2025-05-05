import { inject, Injectable } from "@angular/core";
import { HousingLocation } from "./housing-location";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  private http = inject(HttpClient);

  url = "http://localhost:3000/locations";

  getHousingLocations() {
    return this.http.get<HousingLocation[]>(this.url);
  }

  getHousingLocationById(id: number) {
    return this.http.get<HousingLocation>(`${this.url}/${id}`);
  }

  // submitApplication(firstName: string, lastName: string, email: string) {
  //   console.log(firstName, lastName, email);
  // }
}
