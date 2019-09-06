import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, tap } from 'rxjs/operators';
import { UserTaken } from '../models/user.model';

@Injectable()
export class AuthService {
  private authUrl = 'https://reqres.in/api';
  isLogged: boolean = false;
  constructor(private http: HttpClient) {
    if (localStorage.getItem('auth')) {
      this.isLogged = true;
    }
  }

  isLoggedIn() {
    return this.isLogged;
  }

  login(email: string, password: string) {
    return this.http.post(`${this.authUrl}/login`, { email, password })
      .pipe(
        retry(3),
        tap((res: UserTaken) => {
          if (res.token) {
            localStorage.setItem('auth', res.token);
            this.isLogged = true;
          }
        })
      )
  }


  registration(email: string, password: string) {
    return this.http.post(`${this.authUrl}/register`, { email, password })
      .pipe(
        retry(3),
        tap((res: UserTaken) => {
          if (res.token) {
            localStorage.setItem('auth', res.token);
            this.isLogged = true;
          }
        })
      )
  }

  exit() {
    this.isLogged = false;
    localStorage.clear();
  }
}
