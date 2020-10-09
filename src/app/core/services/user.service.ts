import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";
import { ApiService } from "./api.service";
import { User } from "../models";
import { map, distinctUntilChanged } from "rxjs/operators";

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService) {}

  populate() {
    this.purgeAuth();
  }

  setAuth(user: User) {
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    console.log("attemptauth");
    const route = "/employee/login";
    return this.apiService.post(route, credentials).pipe(
      map((data) => {
        this.setAuth(data);
        console.log("attemptauth"+this.getCurrentUser().name);
        return data;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user: User): Observable<User> {
    console.log(user.id + "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    return this.apiService.put(`/employee/update/${user.id}`, user).pipe(
      map((data) => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }

  create(user): Observable<User> {
    console.log(user.email);
    console.log(user.managerId);
    console.log(
      "++++++++++++++++++++--------------------------" + JSON.stringify(user)
    );
    //create user observable
    return this.apiService.post("/employee/create", user).pipe(
      map((data) => {
        return data;
      })
    );
  }

  get(id): Observable<User> {
    return this.apiService.get(`/employee/${id}`).pipe(map((data) => data));
  }

  getAll(): Observable<User[]> {
    return this.apiService
      .get(`/employee/all`)
      .pipe(map((data) => data.comments));
  }

  delete(id) {
    return this.apiService.delete(`/employee/delete/${id}`);
  }
}
