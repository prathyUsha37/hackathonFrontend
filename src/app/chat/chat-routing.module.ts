import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./chat.component";

const routes: Routes = [
  {
    path: "/chat",
    component: ChatComponent,
  },
];

@NgModule({
  exports: [RouterModule],
})
export class EventRoutingModule {}
