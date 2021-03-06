import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { Photo } from "../models";
import { map } from "rxjs/operators";
import { UserService } from "./user.service";

@Injectable()
export class EventParticipantService {
  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  // Update the Photo on the server
  update(photo: Photo): Observable<Photo> {
    return this.apiService.put(`/Photo/update/${photo.id}`).pipe(
      map((data) => {
        return data.Photo;
      })
    );
  }

  create(photo: Photo): Observable<Photo> {
    //create Photo observable
    return this.apiService.post("/photo/create", { photo }).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getById(id: string): Observable<Photo> {
    return this.apiService.get(`/photo/${id}`).pipe(map((data) => data.Photo));
  }

  getAll(): Observable<Photo[]> {
    return this.apiService.get(`/photo/all`).pipe(map((data) => data.Photo));
  }
}
