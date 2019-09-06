import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserListResolve } from '../shared/services/user-list-resolve.service';
import { AuthGuard } from '../shared/services/auth.guard';
import { CanDeactivateGuard } from '../shared/services/can-deactivate-guard.service';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserSingleComponent } from './user-single/user-single.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UsersComponent, UsersListComponent, UserCreateComponent, UserSingleComponent, UserEditComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    RouterModule
  ],
  providers: [
    UserListResolve,
    AuthGuard,
    CanDeactivateGuard,
  ]
})
export class UsersModule { }
