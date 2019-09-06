import { Component, OnInit, Input } from '@angular/core';
import { User, UserList } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {
  @Input() user: User
  users: User[];
  subscription$: Subscription;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private msgService: MessagesService) {
  }

  ngOnInit() {
    this.subscription$ = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id');
      this.userService.getSingleUser(id)
        .subscribe(
          (user: User) => {
            if (user) {
              this.user = user;
            }
          },
          err => {
            this.msgService.setMessage({
              type: 'warning',
              body: err.message
            });
            this.router.navigate(['/users', { action: err }]);
          }
        );
    });



    this.userService.getListUser().subscribe(
      (res: User[]) => this.users = res
    )
  }

  deleteUser() {
    this.userService.deleteUser(this.user.id).pipe(
      switchMap(() => {
        return this.userService.getUsers()
      })
    ).subscribe((users: User[]) => {
      this.users = users;
      this.msgService.setMessage({
        type: 'success',
        body: 'User successfully deleted'
      });
      this.router.navigate(['/users', { action: 'deleted' }]);
    },
      err => {
        this.msgService.setMessage({
          type: 'danger',
          body: err.message
        });
      }
    )
  }

  nextUser() {
    let userIndex = this.users.findIndex((item) => {
      return item.id === this.user.id
    });
    const nextUser = (userIndex + 1) < this.users.length ? this.users[userIndex + 1] : this.users[0];
    this.router.navigate(['/users', nextUser.id]);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
