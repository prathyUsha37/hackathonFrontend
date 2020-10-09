import { Component, OnChanges,Input } from "@angular/core";
import { EventService, Event } from "./../core";

@Component({
  selector: "event-app-card",
  styleUrls: ["./event-card.component.scss"],
  templateUrl: "./event-card.component.html",
})
export class EventCardComponent implements OnChanges  {
  @Input() event: Event;
  constructor(private inventoryRequestService: EventService) {}
  errors: Object = {};

  register(status: string) {}
  ngOnChanges(){

    console.log("changed child");
  }
}
