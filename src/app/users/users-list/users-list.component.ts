import { Component, OnInit } from '@angular/core';
import { User, UserList } from 'src/app/shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];
  pageSize: number = 6;

  constructor(private userService: UserService,
    private msgService: MessagesService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (res: User[]) => {
        this.users = res;
      },
      (err) => {
        this.msgService.setMessage({
          type: 'danger',
          body: err.error.error
        })
      }
    )
  }

}
