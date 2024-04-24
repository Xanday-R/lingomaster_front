import {Component, Inject} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {GlobalService, LanguagesList} from "../../../../core";
import {filter, from, mergeMap, toArray} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-create-word-dialog',
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
    MatOption,
    MatSelect,
    AsyncPipe,
    TranslateModule,
  ],
  templateUrl: './create-word-dialog.component.html',
  styleUrl: '../dialog.scss'
})
export class CreateWordDialogComponent {

  constructor(private globalService: GlobalService) {
  }
  protected languagesWithoutUserNativeLanguage$ = this.globalService.nativeLanguage$.pipe(mergeMap(e => from(LanguagesList).pipe(filter(value => value != e), toArray())));
  public Languages:string[] = LanguagesList;
  wordFormControl = new FormControl('', [Validators.required]);
  languageFormControl = new FormControl('', [Validators.required]);
  translationFormControl  = new FormControl('', [Validators.required]);
}
