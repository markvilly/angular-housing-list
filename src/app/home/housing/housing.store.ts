import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { HousingLocation } from "./housing-location.interface";
import { tapResponse } from "@ngrx/operators";
import { of, pipe, switchMap } from "rxjs";
import { HousingService } from "./housing.service";
import { inject } from "@angular/core";

type State = {
  collection: HousingLocation[];
};

export const HousingStore = signalStore(
  { providedIn: "root" },
  withState<State>({
    collection: [],
  }),
  withMethods((store) => {
    const housingService = inject(HousingService);
    return {
      getLocations: rxMethod<void>(
        pipe(
          switchMap(() => {
            return housingService.getHousingLocations().pipe(
              tapResponse({
                next: (locations) => {
                  patchState(store, {
                    collection: locations,
                  });
                },
                error: () => {},
              }),
            );
          }),
        ),
      ),
    };
  }),

//   withHooks({
//     onInit: (store) => {
//       store.getLocations();
//     },
//   }),
);
