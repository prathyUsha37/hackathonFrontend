import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "angularfire2/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import {Event, EventService,UserService,User} from "./../core"

@Component({
  selector: "app-event-page",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
})

export class EventComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  searchForm: FormGroup;
  isSubmitting = false;
  eventForm: FormGroup;
  isSubmittinge =false;
  events: Event[];
  work:string="Show"
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eventService: EventService,
    private afStorage: AngularFireStorage,
    private userService: UserService
  ) {
    // create form group using the form builder
    this.searchForm = this.fb.group({
      keyword: ""
    });
    this.eventForm = this.fb.group({
      id: "0",
      name: "",
      image:"https://cdn1.iconfinder.com/data/icons/linkedin-ui-glyph/48/Sed-16-512.png",
      createdBy: "prathyusha",
      date:"",
      time: "",
      description:"",
      topic:"",
      link:""
    });
  }
 currentUser:User;
  ngOnInit() { 
    this.currentUser=this.userService.getCurrentUser();
    this.work="show";
    this.eventService.getAll().subscribe(
    (events) =>this.events=events,
    (err) => {
      this.isSubmitting = false;
    }
  );
  }

  register(){

  }
  setWork(value){
    this.work=value;
    console.log(value);
  }


  submitForm() {

    this.work="create";
    this.isSubmitting = true;
    
    this.eventForm.patchValue({ createdBy: this.currentUser.name });
   console.log(this.eventForm.value);
    this.eventService.create(this.eventForm.value).subscribe(
      (event) =>console.log("event created"),
      (err) => {
        this.isSubmitting = false;
      }
    );

    this.isSubmitting = false;
  }

  setConfig(value){
    console.log(this.work);
   this.work="none";
    console.log(value);
        if(value==="all"){
          this.eventService.getAll().subscribe(
            (events) =>this.events=events,
            (err) => {
              this.isSubmitting = false;
            }
          );
        }
        else{
          this.eventService.getByKeyword(value).subscribe(
            (events) =>{this.events=events;
              console.log("key");},
            (err) => {
              this.isSubmitting = false;
              console.log("key");
              this.events=null;
            }
          );
        }

        console.log(this.work);

   this.work="show";
  }

  searchEvent(){
    this.work="none";
    console.log(this.searchForm.value.keyword);
    this.isSubmitting=true;
    this.eventService.getByKeyword(this.searchForm.value.keyword).subscribe(
      (events) =>{this.events=events;
        console.log("key");},
      (err) => {
        this.isSubmitting = false;
        console.log("key");
        this.events=null;
      }
    );
    this.work="show";
    this.isSubmitting = false;
  }

  async upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    console.log(
      "hiiiiiiiiiiiiiiii helooooooooooooooooooo" +
        this.eventForm.value.image
    );
    await this.task;

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL();
          this.ref.getDownloadURL().subscribe((url) => {
            console.log(url);
            this.downloadURL = url;
            this.eventForm.patchValue({ image: this.downloadURL });
            console.log(
              "hiiiiiiiiiiiiiiii helooooooooooooooooooo" +
                this.eventForm.value.image
            );
          });
        })
      )
      .subscribe();
  }
}
