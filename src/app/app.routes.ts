import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { DetailsComponent } from "./details.component";
export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home Page",
  },
  {
    path: "details/:id",
    loadComponent: () =>
      import("./details.component").then((c) => c.DetailsComponent),
    title: "Details Page",
  },
];
