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
export class GlobalService {
  private headers = inject(HEADER_TOKEN);

  readonly askAuth = new BehaviorSubject(null);

  readonly askArchivePractice$:Subject<{id_practice: number}> = new Subject()
  readonly askSignOut$ = new Subject();
  private askInform$:Subject<[ResponseFromServer,string, string?]>  = new Subject();

  readonly isAuth$ = new ReplaySubject<ResponseFromServer>(1);
  readonly archivePractice$ = new ReplaySubject<ResponseFromServer>(1);


  readonly nativeLanguage$ = this.isAuth$.pipe(mergeMap(async (e) => e.info!.native_language!));

  readonly isAuthRequesting$ = this.askAuth
    .pipe(
      switchMap(() =>
        this.http.post<ResponseFromServer>( `${environment.apiUrl}/profile/account-info`, {}, this.headers)
          .pipe(catchError((err) => of(err.error as ResponseFromServer)))
      )
    ).pipe(tap((result) => this.isAuth$.next(result)));
  readonly signOut$ = this.askSignOut$.pipe(mergeMap(() => this.http.get<ResponseFromServer>(`${environment.apiUrl}/profile/sign-out`, this.headers)));
  private archivePracticeRequesting$ = this.askArchivePractice$.pipe(mergeMap(({id_practice}) => this.http.get<ResponseFromServer>(`${environment.apiUrl}/learning/practice/archive/${id_practice}`, this.headers))).pipe(tap((result) => this.archivePractice$.next(result)));
  private isAuthSubscription = this.isAuthRequesting$.subscribe((result) => {})

  private askInformSubscription = this.askInform$.subscribe( ([request, textIfSuccess, navigateIfSuccess ]) => {
    if(request.statusCode == 200) {
      if(!!navigateIfSuccess) this.router.navigate(['/profile']);
      this.inform$.next(textIfSuccess);

    }
    else if(request.statusCode == 500) this.inform$.next('Unknown error! Please wait!');
    else {
      this.inform$.next((request.message as string[]).map((s:string) => upperFirstChar(s)).join('. '));
      if(request.statusCode == 401) this.askAuth.next(null);
    }
  });
  private archivePracticeSubscription = this.archivePracticeRequesting$.subscribe(() => {
  });


  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router, private dialog: MatDialog, private translate: TranslateService) {}

  askInform(request: ResponseFromServer, textIfSuccess: string, navigateIfSuccess?: string) {
    this.askInform$.next([request, textIfSuccess, navigateIfSuccess]);
  }

  private inform$ = new Subject<string>();
  private informSubscription = this.inform$.pipe(mergeMap((e) => this.translate.get(e))).subscribe((message) => {
    this._snackBar.open(
      message,
      'OK!',
      {
        horizontalPosition: "right",
        verticalPosition: "bottom",
        duration: 3*1000
      }
    )
  });

  async openConfirmDialog(question: string) {
    const dialogRef = this.dialog.open(ConfirmSomethingDialogComponent, {
      data: question
    })
    const result = await  firstValueFrom(dialogRef.afterClosed());
    return !!result.confirm;
  }

}
