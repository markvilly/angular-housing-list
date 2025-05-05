import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "./housing.service";
import { HousingLocation } from "./housing-location";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: "app-details",
  imports: [ReactiveFormsModule],
  template: ` <article class="flex flex-col">
    <img
      [src]="housingLocation?.photo"
      alt="Exterior photo of {{ housingLocation?.name }}"
      class="w-full h-[300px] object-cover rounded-lg"
    />
    <section>
      <h2 class="text-3xl text-gray-800 font-bold mt-4">
        {{ housingLocation?.name }}
      </h2>
      <h2 class=" py-3 text-purple-400 font-bold text-xl">
        About this housing location
      </h2>
      <p class="text-gray-500">
        {{ housingLocation?.city }}, {{ housingLocation?.state }}
      </p>
      <p class="mt-4">{{ housingLocation?.availableUnits }} available units</p>
      <p></p>
    </section>
    <section>
      <h2 class="font-bold">Apply to live here</h2>
      <form
        class="flex mt-6 lg:w-1/2 sm:w-2/3 @min-xs:  bg-purple-50 p-4 rounded-lg flex-col"
        [formGroup]="applyForm"
        (submit)="submitApplication()"
      >
        <label class=" font-mono text-gray-800" for="first-name"
          >First Name</label
        >
        <input
          class="p-1 mb-2 bg-gray-50"
          id="first-name"
          type="text"
          formControlName="firstName"
        />

        <label class=" font-mono text-gray-800" for="last-name"
          >Last Name</label
        >
        <input
          class="p-1 mb-2 bg-gray-50"
          id="last-name"
          type="text"
          formControlName="lastName"
        />

        <label class=" font-mono text-gray-800" for="email">Email</label>
        <input
          class="p-1 mb-2 bg-gray-50"
          id="email"
          type="email"
          formControlName="email"
        />
        <button
          type="submit"
          class="bg-purple-400 cursor-pointer text-white rounded-lg py-1 px-4 mt-4"
        >
          Apply Now
        </button>
      </form>
    </section>
  </article>`,
  styles: ``,
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);

  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);

    // this.housingService
    //   .getHousingLocationById(housingLocationId)
    //   .then((location: HousingLocation | undefined) => {
    //     this.housingLocation = location;
    //   });
  }

  submitApplication() {
    // this.housingService.submitApplication(
    //   this.applyForm.value.firstName ?? "",
    //   this.applyForm.value.lastName ?? "",
    //   this.applyForm.value.email ?? ""
    // );
  }
}
