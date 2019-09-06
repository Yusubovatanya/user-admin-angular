import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;
  isEditAction: boolean;
  subscription$: Subscription;
  formErrors = {
    "userName": "",
    "userLogin": "",
    "userPassword": ""
  }

  validationMessages = {
    "userName": {
      "required": "The field cannot be empty",
      "minlength": "Value must have a minimum of 5 characters",
      "maxlength": "Value must have a maximum of 25 characters",
    },
    "userLogin": {
      "required": "The field cannot be empty",
      "email": "Invalid login format",
      "minlength": "Value must have a minimum of 5 characters",
      "maxlength": "Value must have a maximum of 25 characters",
    },
    "userPassword": {
      "required": "The field cannot be empty",
      "pattern": "Invalid password format",
      "minlength": "Value must have a minimum of 5 characters",
      "maxlength": "Value must have a maximum of 25 characters",
    }
  }


  constructor(
    private msgService: MessagesService,
    private formBuild: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {

    this.userForm = this.formBuild.group({
      userLogin: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.email
      ]],
      userName: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]],
      userPassword: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.pattern(/(?=.*[0-9])(?=.*[a-z])/g)
      ]]
    })
    this.userForm.valueChanges.subscribe((e) => {
      if (this.userForm.touched && !this.userForm.pristine) {
        this.onValueChange();
      }
    })
  }

  onValueChange() {
    this.isEditAction = true;
    for (let element in this.formErrors) {
      this.formErrors[element] = "";
      let controlElement = this.userForm.get(element);
      if (controlElement && controlElement.dirty && !controlElement.valid) {
        let message = this.validationMessages[element];
        for (let key in controlElement.errors) {
          this.formErrors[element] += message[key] + " ";
        }
      }
    }
  }

  registration() {
    this.isEditAction = false;
    this.authService.registration(this.userForm.value.userLogin, this.userForm.value.userPassword)
      .subscribe(
        () => {
          this.msgService.setMessage({
            type: 'success',
            body: `${this.userForm.value.userLogin}, You have successfully logged in!`
          });
          this.router.navigate(['/users']);
        },
        (err) => {
          this.msgService.setMessage({
            type: 'danger',
            body: err.error.error
          })
        }
      )
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

}
