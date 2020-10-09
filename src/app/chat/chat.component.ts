import { Component } from "@angular/core";
import * as Stomp from "@stomp/stompjs";
import * as SockJS from "sockjs-client";


@Component({
  selector: "app-chat-page",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent {
  title = "grokonez";
  description = "Angular-WebSocket Demo";

  greetings: string[] = [];
  disabled = true;
  name: string;
  private stompClient = null;

  constructor() {}

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS("http://localhost:8080/gkz-stomp-endpoint");

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.setConnected(true);
      console.log("Connected: " + frame);

      _this.stompClient.subscribe("/topic/hi", function (hello) {
        _this.showGreeting(JSON.parse(hello.body).greeting);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log("Disconnected!");
  }

  sendName() {
    this.stompClient.send(
      "/gkz/hello",
      {},
      JSON.stringify({ name: this.name })
    );
  }

  showGreeting(message) {
    this.greetings.push(message);
  }
}
