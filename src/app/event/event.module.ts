import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EventComponent } from "./event.component";
import { EventRoutingModule } from "./event-routing.module";
import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventCardComponent } from '../event-card/event-card.component';
@NgModule({
  imports: [
    EventRoutingModule,
    CommonModule, FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDU5D1GO6Xu5Zy72nnEQUwEVoNCT8F2t6w",
      authDomain: "soar-adp.firebaseapp.com",
      projectId: "soar-adp",
      storageBucket: "soar-adp.appspot.com",
    }),
    AngularFireStorageModule,
  ],
  declarations: [EventComponent,EventCardComponent],
})
export class EventModule {}
