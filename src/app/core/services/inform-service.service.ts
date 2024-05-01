import { Injectable } from '@angular/core';
import {
  ConfirmSomethingDialogComponent
} from '../../shared/components/confirm-something-dialog/confirm-something-dialog.component';
import {firstValueFrom, switchMap, Subject} from 'rxjs';
import {ResponseFromServer} from '@core/types/response-from-server.type';
import {upperFirstChar} from '@core/utils/upper-first-char';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class InformService {

  constructor(private _snackBar: MatSnackBar, private router: Router, private translate: TranslateService) { }

  private askInform$:Subject<[ResponseFromServer,string, string?]>  = new Subject();

  private askInformSubscription = this.askInform$.subscribe( ([request, textIfSuccess, navigateIfSuccess ]) => {
    if(request.statusCode == 200) {
      if(!!navigateIfSuccess) this.router.navigate([navigateIfSuccess]);
      this.inform$.next(textIfSuccess);

    }
    else if(request.statusCode == 500) this.inform$.next('Unknown error! Please wait!');
    else this.inform$.next((request.message as string[]).map((s:string) => upperFirstChar(s)).join('. '));
  });

  askInform(request: ResponseFromServer, textIfSuccess: string, navigateIfSuccess?: string) {
    this.askInform$.next([request, textIfSuccess, navigateIfSuccess]);
  }

  private inform$ = new Subject<string>();
  private informSubscription = this.inform$.pipe(switchMap((e) => this.translate.get(e))).subscribe((message) => {
    this._snackBar.open(
      message,
      'OK!',
      {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 3*1000
      }
    )
  });
}
