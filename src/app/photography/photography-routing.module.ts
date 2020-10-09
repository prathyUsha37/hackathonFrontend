import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PhotographyComponent } from "./photography.component";

const routes: Routes = [
  {
    path: "/photography",
    component: PhotographyComponent,
  },
];

@NgModule({
  exports: [RouterModule],
})
export class PhotographyRoutingModule {}
