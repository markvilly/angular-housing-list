import { Component, inject } from "@angular/core";
import { HousingLocation } from "./housing-location";
import { HousingLocationComponent } from "./housing-location.component";
import { HousingService } from "./housing.service";

@Component({
  selector: "app-home",
  imports: [HousingLocationComponent],
  template: `
    <section class="">
      <form action="" class=" mb-4">
        <input
          type="text"
          class=" placeholder-gray-500 bg-gray-50 border-1 rounded-lg border-gray-300 py-1 px-4 mr-2"
          placeholder="Filter by city"
          id=""
        />
        <button class=" py-1 px-4 bg-purple-400 text-white rounded-lg">
          Search
        </button>
      </form>
    </section>
    <section class="flex gap-4 flex-wrap">
      @for(house of housingLocationList; track house.id){
      <app-housing-location class=" " [housingLocation]="house" />
      }
    </section>
  `,
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  // injection of HousingService
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
