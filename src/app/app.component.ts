import { Component } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
// import { HousingLocationComponent } from "./housing-location.component";

@Component({
  selector: "app-root",
  imports: [RouterModule],
  template: `
    <main class="px-10 py-10 bg-red-100 h-[100vh]">
      <header>
        <img src="/assets/logo.svg" alt="Logo" />
      </header>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = "Meet Homes";
}
