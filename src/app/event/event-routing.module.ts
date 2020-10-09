import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventComponent } from "./event.component";

const routes: Routes = [
  {
    path: "/event",
    component: EventComponent,
  },
];

@NgModule({
  exports: [RouterModule],
})
export class EventRoutingModule {}
