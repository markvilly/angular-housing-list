import { Component, Input } from "@angular/core";
import { HousingLocation } from "./housing-location";
import { RouterModule } from "@angular/router";
@Component({
  selector: "app-housing-location",
  imports: [RouterModule],
  template: ` <section
    class=" bg-white  drop-shadow-md transition duration-300 delay-50 ease-in-out hover:drop-shadow-xl p-4  lg:w-[300px]  rounded-lg h-[350px] mb-4 border-gray-400"
  >
    <div class="h-[200px] w-full overflow-hidden rounded-lg">
      <img
        class="object-cover w-full h-full"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
      />
    </div>
    <h2 class=" py-3">{{ housingLocation.name }}</h2>
    <p class="">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
    <a
      class=" text-purple-400 font-semibold"
      [routerLink]="['/details', housingLocation.id]"
      >Learn More</a
    >
  </section>`,
})
export class HousingLocationComponent {
  @Input({ required: true }) housingLocation!: HousingLocation;
}
