import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home Page",
  },
  {
    path: ":id",
    title: "Details Page",
    loadComponent: () =>
      import("./home/housing/location-details.component").then(
        (c) => c.LocationDetailsComponent,
      ),
  },
];
