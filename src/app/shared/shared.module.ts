import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserItemComponent } from './user-item/user-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserItemComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [UserItemComponent]
})
export class SharedModule { }
