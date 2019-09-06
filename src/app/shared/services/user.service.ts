import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, retry, map } from 'rxjs/operators';
import { User, UserList, UserData, UserUpdate, UserCreate } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string = 'https://reqres.in/api/users';
  usersList: User[];

  constructor(private http: HttpClient) { }

  getListUser() {
    return of(this.usersList);
  }

  getUsers(): Observable<User[]> {
    if (!this.usersList) {
      return this.http.get(this.usersUrl).pipe(
        map((res: UserList) => res.data),
        tap((res) => {
          this.usersList = res;
        })
      )
    } else {
      return of(this.usersList)
    }
  }

  getSingleUser(id: number): Observable<User> {
    if (!this.usersList || !this.findUserId(id)) {
      return this.http.get(`${this.usersUrl}/${id}`).pipe(
        map((res: UserData) => res.data)
      )
    } else {
      return of(this.usersList.find((item) => item.id === id))
    }
  }

  findUserId(id) {
    if (this.usersList) {
      return this.usersList.some((item) => { return item.id === id })
    } else return false
  }

  deleteUser(id) {
    return this.http.delete(`${this.usersUrl}/${id}`)
      .pipe(
        retry(2)
      );
  }

  editUser(userEdit) {
    return this.http.put(`${this.usersUrl}/${userEdit.id}`, userEdit).pipe(
      retry(2),
      tap(() => {
        this.usersList.forEach(user => {
          if (user.id === userEdit.id) {
            user.first_name = userEdit.name;
            user.job = userEdit.job;
            user.last_name = userEdit.last_name
          }
        });
      })
    );
  }

  createUser(user) {
    return this.http.post(this.usersUrl, user).pipe(
      tap(() => {
        user.id = this.usersList.length + 1;
        this.usersList.push(user);
      }));
  }

}
