import {InjectionToken, Provider} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {
  ConfirmSomethingDialogComponent
} from '../../shared/components/confirm-something-dialog/confirm-something-dialog.component';
import {firstValueFrom} from 'rxjs';

export const CONFIRMDIALOG_TOKEN = new InjectionToken<(question: string) => Promise<boolean>>('CONFIRM_DIALOG_TOKEN');

export function requestOptionsFactory (dialog: MatDialog) {
  return async function (question: string) {
    const dialogRef = dialog.open(ConfirmSomethingDialogComponent, {
      data: question
    })
    const result = await firstValueFrom(dialogRef.afterClosed());
    return !!result.confirm;
  }
}

export const confirmDialogOptions : Provider = {
  provide: CONFIRMDIALOG_TOKEN,
  useFactory: requestOptionsFactory,
  deps: [MatDialog]
}
