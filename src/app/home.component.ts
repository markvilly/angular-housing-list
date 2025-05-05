import { Component, inject } from "@angular/core";
import { HousingLocation } from "./housing-location";
import { HousingLocationComponent } from "./housing-location.component";
import { HousingService } from "./housing.service";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-home",
  imports: [HousingLocationComponent, ReactiveFormsModule],
  template: `
    <section class="">
      <form
        action=""
        [formGroup]="search"
        (submit)="searchByFilter()"
        class=" mb-4"
      >
        <input
          type="text"
          formControlName="city"
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
      <app-housing-location
        class=" basis-4/4 min-md:basis-1/4"
        [housingLocation]="house"
      />
      }
    </section>
  `,
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  // injection of HousingService
  housingService: HousingService = inject(HousingService);

  search = new FormGroup({
    city: new FormControl(""),
  });

  searchByFilter() {
    this.housingService.searchByFilter(this.search.value.city);
  }

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((locationList: HousingLocation[]) => {
        this.housingLocationList = locationList;
      });
  }
}
