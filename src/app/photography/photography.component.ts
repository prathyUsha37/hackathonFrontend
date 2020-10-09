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
import { NONE_TYPE } from "@angular/compiler/src/output/output_ast";
import { PhotoService,Photo,User,UserService } from "../core";

@Component({
  selector: "app-photography-page",
  templateUrl: "./photography.component.html",
  styleUrls: ["./photography.component.scss"],
})
export class PhotographyComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  photographyForm: FormGroup;
  isSubmitting = false;
  photos : Photo[]=[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private photoService: PhotoService,
    private afStorage: AngularFireStorage,
    private userService: UserService
  ) {
    // create form group using the form builder
    this.photographyForm = this.fb.group({
      id: "0",
      name: "prathyusha",
      caption: "",
      count: "0",
      image:
        "https://cdn1.iconfinder.com/data/icons/linkedin-ui-glyph/48/Sed-16-512.png",
    });
  }
  currentUser: User;
  ngOnInit() {
    this.currentUser=this.userService.getCurrentUser();
    this.photoService.getAll().subscribe(
      (photos) => {this.photos=photos;console.log("photos loaded")},
      (err) => {
      }
    );
  }

  increaseCount(i) {
    console.log("hhhhhhhhhhhh" + i);
    var counter= document.getElementById("count"+i).innerHTML;
    console.log("countttttttttt"+counter);
    var count: number = Number(counter);
    count++;
    document.getElementById(i).style.pointerEvents = "none";
    console.log(document.getElementById(i).innerHTML);
    this.photos[i].count=count.toString();
    this.photoService.update(this.photos[i]).subscribe(
      (photos) => {console.log("photo like added")},
      (err) => {
      }
    );
  }

  submitForm() {
    this.isSubmitting = true;
    
    this.photographyForm.patchValue({ name: this.currentUser.name });
    console.log(this.photographyForm.value);
    this.photoService.create(this.photographyForm.value).subscribe(
      (updatedUser) => console.log("photo uploaded"),
      (err) => {
      }
    );

    this.isSubmitting = false;
  }

  async upload(event) {
    console.log("hiiiiiiiiiiiiiiii");
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    console.log(
      "hiiiiiiiiiiiiiiii helooooooooooooooooooo" +
        this.photographyForm.value.image
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
            this.photographyForm.patchValue({ image: this.downloadURL });
            console.log(
              "hiiiiiiiiiiiiiiii helooooooooooooooooooo" +
                this.photographyForm.value.image
            );
          });
        })
      )
      .subscribe();
  }
}
