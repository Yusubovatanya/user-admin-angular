import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User
  constructor(private router: Router) { }

  ngOnInit() {
  }
  
}
