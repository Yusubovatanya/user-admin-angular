import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) {
  }

  counter: number = 5;
  subscription$: Subscription;
  observable: Observable<number>;

  ngOnInit() {

    this.observable = interval(1000).pipe(
      map(item => {
        return 4 - item;
      }),
      take(5)
    );

    this.subscription$ = this.observable.subscribe(
      time => this.counter = time,
      error => console.log(error),
      () => this.router.navigate(['/users'])
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
