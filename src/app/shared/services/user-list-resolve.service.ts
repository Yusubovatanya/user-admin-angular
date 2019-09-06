import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { UserService } from './user.service';
import { of } from 'rxjs';

@Injectable()
export class UserListResolve implements Resolve<any> {

  constructor(
    private userService: UserService,
  ) { }
  
  resolve() {
    if (!this.userService.usersList) {
      return this.userService.getUsers();
    } else {
      return of(this.userService.usersList)
    }
  }
}
