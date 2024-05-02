import {Component, Inject, model} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {AuthService, IText} from '../../../../core';
import {
  ChooseModelPracticeDialogComponent
} from '../choose-model-practice-dialog/choose-model-practice-dialog.component';
import {firstValueFrom} from 'rxjs';
import {ModelsPractice} from '../../../../core/enums/models-practice.enum';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-show-text-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './show-text-dialog.component.html',
  styleUrl: '../dialog.scss'
})
export class ShowTextDialogComponent {
  public innerHtml = this.text.text.replace(/[\[\]{}()]/g, '').replace(/\n/g, '<br>');

  constructor(public dialogRef: MatDialogRef<ShowTextDialogComponent>, @Inject(MAT_DIALOG_DATA) public text: IText, protected authService: AuthService, private dialog: MatDialog) {

  }

  async startPractice() {
    const dialogRef = this.dialog.open(ChooseModelPracticeDialogComponent);
    const model:ModelsPractice= await firstValueFrom(dialogRef.afterClosed());
    if(!model) this.dialogRef.close();
    else this.dialogRef.close({start: true, model});
  }
}
