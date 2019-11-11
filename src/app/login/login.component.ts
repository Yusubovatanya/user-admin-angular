import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = { username: '', password: '', type: 'local' };
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private msgService: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isLogged) {
      this.router.navigate(['/users'])
    }
  }

  login() {
    this.errorMessage = '';
    this.authService.login(this.loginForm.username, this.loginForm.password)
      .subscribe(
        () => {
          this.msgService.setMessage({ type: 'success', body: 'You have successfully logged in!' });
          this.router.navigate(['/users']);
        },
        (err) => {
          this.msgService.setMessage({
            type: 'danger',
            body: err.error.error
          });
        }
      )
  }

  goToRegistration() {
    this.router.navigate(['/registration'])
  }

}
