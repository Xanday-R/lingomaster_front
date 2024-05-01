import { HttpClient } from "@angular/common/http";
import { HEADER_TOKEN, ResponseFromServer } from '..';
import {
  auditTime, BehaviorSubject, catchError, debounceTime, of, ReplaySubject, share, shareReplay, startWith, Subject,
  switchMap, tap,
  throttleTime
} from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  private headers = inject(HEADER_TOKEN);

  readonly askAuth = new BehaviorSubject(null);

  readonly isAuth$ = new ReplaySubject<ResponseFromServer>();

  readonly isAuthRequesting$ = this.askAuth
    .pipe(
      switchMap(() =>
        this.http.post<ResponseFromServer>( `${environment.apiUrl}/profile/account-info`, {}, this.headers())
          .pipe(
            catchError((err) => of(err.error as ResponseFromServer)),
          )
      )
    ).pipe(
      tap((result) => this.isAuth$.next(result)),
    );

  constructor(private http: HttpClient) {}

}
