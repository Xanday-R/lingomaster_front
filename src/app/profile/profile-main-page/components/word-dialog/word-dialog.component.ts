import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {IWord} from "../../../../core";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-word-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatIcon,
    TranslateModule,
  ],
  templateUrl: './word-dialog.component.html',
  styleUrl: '../dialog.scss'
})
export class WordDialogComponent {
  wordFormControl = new FormControl(this.data.word, [Validators.required]);
  translationFormControl  = new FormControl(this.data.translation, [Validators.required]);
  constructor(
    public dialogRef: MatDialogRef<WordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IWord,
  ) {}
}
