import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { debounceTime, startWith } from "rxjs";
import { LocationCardComponent } from "./housing/location-card.component";
import { HousingStore } from "./housing/housing.store";

@Component({
  selector: "app-home",
  imports: [LocationCardComponent, FormsModule],
  template: `
    <section class="mb-4">
      <!-- <form class=" mb-4"> -->
      <input
        type="text"
        [(ngModel)]="searchText"
        class=" placeholder-gray-500 bg-gray-50 border-1 rounded-lg border-gray-300 py-1 px-4 mr-2"
        placeholder="Filter by city"
      />
      <!-- </form> -->
    </section>

    <section class="flex gap-4 flex-wrap">
      @for (house of filteredHousingLocations(); track house.id) {
        <app-location-card
          class=" basis-4/4 min-md:basis-1/4"
          [housingLocation]="house"
        />
      }
    </section>
  `,
})
export class HomeComponent implements OnInit {
  protected readonly housingStore = inject(HousingStore);

  searchText = signal("");
  searchText$ = toObservable(this.searchText).pipe(
    startWith(""),
    debounceTime(300),
  );

  #searchText = toSignal(this.searchText$, { initialValue: "" });

  filteredHousingLocations = computed(() => {
    const collection = this.housingStore.collection();
    const searchValue = this.#searchText();

    return collection.filter((location) => {
      return (
        location.city
          .toLocaleLowerCase()
          .includes(searchValue?.toLocaleLowerCase() ?? "") ||
        location.state
          .toLocaleLowerCase()
          .includes(searchValue?.toLocaleLowerCase() ?? "")
      );
    });
  });

  // public readonly housingService = inject(HousingService);
  // private readonly housingLocations$ =
  //   this.housingService.getHousingLocations();

  // readonly searchCtrl = new FormControl("");

  // private readonly filteredHousingLocations$ =
  //   this.searchCtrl.valueChanges.pipe(
  //     startWith(""),
  //     debounceTime(300),
  //     switchMap((searchValue) => {
  //       return this.housingLocations$.pipe(
  //         map((locations) => {
  //           return locations.filter((location) => {
  //             return (
  //               location.city
  //                 .toLocaleLowerCase()
  //                 .includes(searchValue?.toLocaleLowerCase() ?? "") ||
  //               location.state
  //                 .toLocaleLowerCase()
  //                 .includes(searchValue?.toLocaleLowerCase() ?? "")
  //             );
  //           });
  //         }),
  //       );
  //     }),
  //   );

  // filteredHousingLocations = toSignal(this.filteredHousingLocations$, {
  //   initialValue: [],
  // });

  ngOnInit(): void {
    this.housingStore.getLocations();
  }
}
