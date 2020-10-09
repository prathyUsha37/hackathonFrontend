import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { EventModule } from "./event/event.module";
import {
  HttpClientModule /* other http imports */,
} from "@angular/common/http";

import { PhotographyModule } from "./photography/photography.module";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";
import { HomeModule } from "./home/home.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EventService, PhotoService } from "./core";
import {ChatModule} from "./chat/chat.module";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AuthModule,ChatModule,
    PhotographyModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    EventModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDU5D1GO6Xu5Zy72nnEQUwEVoNCT8F2t6w",
      authDomain: "soar-adp.firebaseapp.com",
      projectId: "soar-adp",
      storageBucket: "soar-adp.appspot.com",
    }),
    AngularFireStorageModule,
  ],
  bootstrap: [AppComponent],
  providers: [EventService, PhotoService],
})
export class AppModule {}
