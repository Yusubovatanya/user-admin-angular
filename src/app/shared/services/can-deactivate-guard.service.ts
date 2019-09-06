import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserEditComponent } from 'src/app/users/user-edit/user-edit.component';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<UserEditComponent> {

  constructor(private msgService: MessagesService) {
  }

  canDeactivate(component: UserEditComponent): Observable<boolean> {
    if (component.isEditAction) {
      this.msgService.setMessage({
        type: 'warning',
        body: 'Are you sure you want to leave page without saving?',
        action: true
      });
      return this.msgService.submitObservable;
    }
    return of(true)
  }


}
