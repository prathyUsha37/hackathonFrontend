import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { UserService } from "../core";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth.component.html",
  styleUrls:["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  authType: String = "login";
  title: String = "";
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      id: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;
    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      (data) => {
        console.log("used this path");
          this.router.navigateByUrl("/home");
      },
      (err) => {
        this.isSubmitting = false;
      }
    );
    
    console.log(
      "+++++++++++++++++++++++++++"
    );
  }
}
