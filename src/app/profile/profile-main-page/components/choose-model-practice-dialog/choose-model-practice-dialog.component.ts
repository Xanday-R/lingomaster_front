import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {LanguagesList, ModelPracticeList} from '../../../../core';
import {MatOption} from '@angular/material/autocomplete';
import {MatSelect} from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-choose-model-practice-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatError,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    TranslateModule
  ],
  templateUrl: './choose-model-practice-dialog.component.html',
  styleUrl: '../dialog.scss'
})
export class ChooseModelPracticeDialogComponent {

  public modelFormControl = new FormControl('', [Validators.required]);


  protected readonly Languages = LanguagesList;
  protected readonly ModelPracticeList = ModelPracticeList;
}
