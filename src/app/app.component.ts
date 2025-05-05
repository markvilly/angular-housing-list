import { Component } from "@angular/core";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
// import { HousingLocationComponent } from "./housing-location.component";

@Component({
  selector: "app-root",
  imports: [RouterModule],
  template: `
    <main class="px-10 py-10  h-[100vh]">
      <header class="py-4">
        <a routerLink=""><img src="assets/logo.svg" alt="Logo" /></a>
      </header>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = "Meet Homes";
}
