import { inject, Injectable } from "@angular/core";
import { HousingLocation } from "./housing-location.interface";
import { HttpClient } from "@angular/common/http";

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
}
