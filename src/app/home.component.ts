import { Component, inject } from "@angular/core";
import { HousingLocation } from "./housing-location";
import { HousingLocationComponent } from "./housing-location.component";
import { HousingService } from "./housing.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { AsyncPipe } from "@angular/common";
import { debounceTime, map, startWith, switchMap } from "rxjs";

@Component({
  selector: "app-home",
  imports: [HousingLocationComponent, ReactiveFormsModule, AsyncPipe],
  template: `
    <section class="">
      <form class=" mb-4">
        <input
          type="text"
          [formControl]="searchCtrl"
          class=" placeholder-gray-500 bg-gray-50 border-1 rounded-lg border-gray-300 py-1 px-4 mr-2"
          placeholder="Filter by city"
          id=""
        />
      </form>
    </section>

    <section class="flex gap-4 flex-wrap">
      @for (house of filteredHousingLocations$ | async; track house.id) {
        <app-housing-location
          class=" basis-4/4 min-md:basis-1/4"
          [housingLocation]="house"
        />
      }
    </section>
  `,
})
export class HomeComponent {
  public readonly housingService = inject(HousingService);
  private readonly housingLocations$ =
    this.housingService.getHousingLocations();

  readonly searchCtrl = new FormControl("");

  public readonly filteredHousingLocations$ = this.searchCtrl.valueChanges.pipe(
    startWith(""),
    debounceTime(300),
    switchMap((searchValue) => {
      return this.housingLocations$.pipe(
        map((locations) => {
          return locations.filter((location) => {
            return (
              location.city
                .toLocaleLowerCase()
                .includes(searchValue?.toLocaleLowerCase() ?? "") ||
              location.state
                .toLocaleLowerCase()
                .includes(searchValue?.toLocaleLowerCase() ?? "")
            );
          });
        }),
      );
    }),
  );
}
