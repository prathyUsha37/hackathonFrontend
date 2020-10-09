import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { Photo, Event } from "../models";
import { map } from "rxjs/operators";
import { UserService } from "./user.service";

@Injectable()
export class EventService {
  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  // Update the Photo on the server
  update(event: Event): Observable<Event> {
    return this.apiService.put(`/event/update/${event.id}`).pipe(
      map((data) => {
        return data.Event;
      })
    );
  }

  create(event: Event): Observable<Event> {
    //create Photo observable
    return this.apiService.post("/event/create", event).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getById(id: string): Observable<Event> {
    return this.apiService.get(`/event/${id}`).pipe(map((data) => data.Event));
  }

  getAll(): Observable<Event[]> {

    console.log("event fetch");
    return this.apiService.get(`/event/all`).pipe(map((data) => data));
  }

  getByKeyword(keyword: string): Observable<Event[]> {
    console.log(keyword+"event fetch");
    return this.apiService
      .get(`/event/keyword/${keyword}`)
      .pipe(map((data) => data));
  }

  getUpcoming(): Observable<Event[]> {
    return this.apiService.get(`/event/upcoming`).pipe(map((data) => data));
  }
}
