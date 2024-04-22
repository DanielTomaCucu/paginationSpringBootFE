import { Component, OnInit } from '@angular/core';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Page } from './interface/page';
import { UserService } from './service/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  usersState$: Observable<{
    appState: string;
    appData?: any;
    error?: HttpErrorResponse;
  }>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.usersState$ = this.currentPage$.pipe(
      switchMap((page) => this.userService.users$('', page)),
      map((response) => ({ appState: 'APP_LOADED', appData: response })),
      startWith({ appState: 'APP_LOADING' }),
      catchError((error) => of({ appState: 'APP_ERROR', error }))
    );
  }

  goToPage(name?: string, pageNumber: number = 0): void {
    this.currentPageSubject.next(pageNumber);
  }

  goToNextOrPreviousPage(
    direction: 'forward' | 'backward',
    name?: string
  ): void {
    const adjustment = direction === 'forward' ? 1 : -1;
    const nextPage = this.currentPageSubject.value + adjustment;
    this.currentPageSubject.next(nextPage);
  }
}
