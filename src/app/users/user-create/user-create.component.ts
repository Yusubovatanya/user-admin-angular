import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserCreate } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  photoUrl: string;
  userForm: FormGroup;
  isEditAction: boolean;

  constructor(
    private userService: UserService,
    private msgService: MessagesService,
    private router: Router,
    private formBuild: FormBuilder,
  ) { }

  formErrors = {
    "name": "",
    "phone": "",
    "data": "",
    "email": "",
    "job": "",
    "secondName": ""
  }

  validationMessages = {
    "name": {
      "required": "The field cannot be empty",
      "minlength": "Value must have a minimum of 5 characters",
      "maxlength": "Value must have a maximum of 25 characters"
    },
    "email": {
      "required": "The field cannot be empty",
      "email": "Invalid email format",
      "minlength": "Value must have a minimum of 5 characters",
      "maxlength": "Value must have a maximum of 25 characters",
    },
    "data": {
      "required": "The field cannot be empty",
    },
    "phone": {
      "required": "The field cannot be empty",
      "onlyPhoneNumberErr": "only number"
    },
    "job": {
      "required": "The field cannot be empty",
    },
    "secondName": {
      "required": "The field cannot be empty",
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.formBuild.group({
      photo: [""],
      name: ["", [
        Validators.required
      ]],
      secondName: ["", [
        Validators.required
      ]],
      email: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.email
      ]],
      data: ["", [
        Validators.required
      ]],
      job: ["", [
        Validators.required
      ]],
      phone: ["", [
        Validators.required,
        this.checkPhoneNumber
      ]],
      other: [""]
    })

    this.userForm.valueChanges.subscribe(() => {
      if (this.userForm.touched && !this.userForm.pristine) {
        this.isEditAction = true;
        this.onValueChange();
      }
    });
  }

  checkPhoneNumber(control: FormControl) {
    const reg = new RegExp('^\\d+$');
    if (!reg.test(control.value)) {
      return {
        'onlyPhoneNumberErr': true
      };
    }
    return null;
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

  uploadPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      const readerFile = new FileReader();
      readerFile.readAsDataURL(event.target.files[0]);
      readerFile.onload = (event: any) => {
        this.photoUrl = event.target.result;
      };
    }
  }

  createUser() {
    this.isEditAction = false;
    let userCreate = {
      name: this.userForm.value.name,
      job: this.userForm.value.job,
      avatar: this.photoUrl,
      email: this.userForm.value.email,
      first_name: this.userForm.value.name,
      last_name: this.userForm.value.secondName
    }

    this.userService.createUser(userCreate).subscribe(
      (res: UserCreate) => {
        this.msgService.setMessage({
          type: 'success',
          body: 'User successfully created'
        });
        setTimeout(() => {
          this.router.navigate(['/users', { action: 'created' }]);
        }, 3000);
      },
      err => {
        this.msgService.setMessage({
          type: 'danger',
          body: err.message
        });
        console.error(err);
      }
    )
  }
}
    // for visualization fake data
    //  let newUser= {
    //   avatar: this.photoUrl,
    //   email: this.userForm.value.email,
    //   first_name: this.userForm.value.name,
    //   last_name: this.userForm.value.secondName
    // }

    // this.userService.createUserFakeData(newUser)
    //   


