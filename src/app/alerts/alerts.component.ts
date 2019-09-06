import { Component, OnInit } from '@angular/core';
import { Message } from '../shared/models/message.model';
import { MessagesService } from '../shared/services/messages.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  isShowAlert: boolean = false;
  message: Message;
  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messagesService.messagesObservable.subscribe(
      (msg: Message) => {
        this.isShowAlert = true;
        this.message = msg;
        if (!msg.action) {
          setTimeout(() => this.isShowAlert = false, 4000);
        }
      }
    )
  }

  confirmAlert() {
    this.isShowAlert = false;
    this.messagesService.submit()
  }

  closeAlert() {
    this.isShowAlert = false;
    this.messagesService.submit(false)
  }
}
