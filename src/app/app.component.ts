import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-admin';

  constructor(private authService: AuthService,
    private router: Router) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

  logOut() {
    this.authService.exit();
    this.router.navigate(['/login'])
  }
}
