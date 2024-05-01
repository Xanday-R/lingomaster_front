import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/autocomplete';
import {MatSelect} from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-something-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    TranslateModule
  ],
  templateUrl: './confirm-something-dialog.component.html',
  styleUrl: './confirm-something-dialog.component.scss'
})
export class ConfirmSomethingDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA)  public  question: string) {

  }

}
