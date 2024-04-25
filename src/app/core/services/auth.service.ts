import {inject, Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HEADER_TOKEN} from "../providers/headers.provider";
import {
  BehaviorSubject, catchError,
  distinctUntilChanged,
  firstValueFrom,
  interval, map, mergeMap,
  Observable, of, ReplaySubject,
  startWith,
  Subject,
  switchMap, tap
} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {ResponseFromServer} from "../types/response-from-server.type";
import {upperFirstChar} from "../utils/upper-first-char";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmSomethingDialogComponent
} from "../../shared/components/confirm-something-dialog/confirm-something-dialog.component";
import {B} from "@angular/cdk/keycodes";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Injectable({providedIn: 'root'})
export class AuthService {
  private headers = inject(HEADER_TOKEN);

  readonly askAuth = new BehaviorSubject(null);

  // readonly askSignOut$ = new Subject();

  readonly isAuth$ = new ReplaySubject<ResponseFromServer>(1);



  readonly isAuthRequesting$ = this.askAuth
    .pipe(
      switchMap(() =>
        this.http.post<ResponseFromServer>( `${environment.apiUrl}/profile/account-info`, {}, this.headers())
          .pipe(catchError((err) => of(err.error as ResponseFromServer)))
      )
    ).pipe(tap((result) => this.isAuth$.next(result)));
  // readonly signOut$ = this.askSignOut$.pipe(mergeMap(() => this.http.get<ResponseFromServer>(`${environment.apiUrl}/profile/sign-out`, this.headers)));

  private isAuthSubscription = this.isAuthRequesting$.subscribe((result) => {})



  constructor(private http: HttpClient) {}







}
