import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages$ = new Subject<Message>();
  submit$ = new Subject<boolean>();
  messagesObservable = this.messages$.asObservable();
  submitObservable = this.submit$.asObservable();

  constructor() { }

  setMessage(msg: Message) {
    this.messages$.next(msg);
  }

  submit(confirmation = true) {
    this.submit$.next(confirmation);
  }
}