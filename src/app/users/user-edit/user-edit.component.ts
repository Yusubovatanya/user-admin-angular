import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User, UserUpdate } from 'src/app/shared/models/user.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  user: User;
  isEditAction: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private msgService: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isEditAction = true;
    const id = +this.activatedRoute.snapshot.params['id'];
    this.userService.getSingleUser(id).subscribe(
      (user: User) => {
        if (user) {
          this.user = user;
          if (!this.user.job) {
            this.user.job = ""
          }
        }
      },
      (err) => {
        this.msgService.setMessage({
          type: 'warning',
          body: err.error.error
        });
      })
  }

  updateUser() {
    this.isEditAction = false;
    let userEdit = {
      id: this.user.id,
      name: this.user.first_name,
      job: this.user.job,
      last_name: this.user.last_name
    }

    this.userService.editUser(userEdit).subscribe(
      (res: UserUpdate) => {
        this.msgService.setMessage({
          type: 'success',
          body: 'User successfully updated'
        });
        setTimeout(() => {
          this.router.navigate(['/users']);
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

  close() {
    this.isEditAction = false;
    this.router.navigate(['/users']);
  }

}
