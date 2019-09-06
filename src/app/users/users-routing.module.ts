import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserListResolve } from '../shared/services/user-list-resolve.service';
import { UsersListComponent } from './users-list/users-list.component';
import { CanDeactivateGuard } from '../shared/services/can-deactivate-guard.service';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserSingleComponent } from './user-single/user-single.component';


const routes: Routes = [{
  path: '',
  component: UsersComponent,
  resolve: { users: UserListResolve },
  children: [
    {
      path: '',
      component: UsersListComponent
    },
    {
      path: 'create',
      component: UserCreateComponent,
      canDeactivate: [CanDeactivateGuard]
    },
    {
      path: ':id',
      component: UserSingleComponent
    },
    {
      path: ':id/edit',
      component: UserEditComponent,
      canDeactivate: [CanDeactivateGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
