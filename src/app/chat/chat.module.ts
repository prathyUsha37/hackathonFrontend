import { CommonModule } from "@angular/common";
import { ChatComponent } from "./chat.component";
import { EventRoutingModule } from "./chat-routing.module";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  imports: [EventRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ChatComponent],
})
export class ChatModule {}
