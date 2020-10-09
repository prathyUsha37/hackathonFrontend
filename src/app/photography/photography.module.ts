import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PhotographyComponent } from "./photography.component";
import { PhotographyRoutingModule } from "./photography-routing.module";
import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    PhotographyRoutingModule,FormsModule, ReactiveFormsModule,
    CommonModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDU5D1GO6Xu5Zy72nnEQUwEVoNCT8F2t6w",
      authDomain: "soar-adp.firebaseapp.com",
      projectId: "soar-adp",
      storageBucket: "soar-adp.appspot.com",
    }),
    AngularFireStorageModule,
  ],
  declarations: [PhotographyComponent],
})
export class PhotographyModule {}
