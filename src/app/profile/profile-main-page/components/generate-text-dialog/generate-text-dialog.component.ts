import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {
  BehaviorSubject,
  concatAll, concatMap, debounce, debounceTime,
  filter,
  forkJoin, from,
  interval,
  map,
  mergeMap,
  Observable,
  of, startWith, Subject,
  switchMap, toArray,
  withLatestFrom,
  zip
} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {FormatsList, GlobalService, IWord, LanguagesList, LevelsList} from "../../../../core";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-generate-text-dialog',
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
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    AsyncPipe,
    TranslateModule
  ],
  templateUrl: './generate-text-dialog.component.html',
  styleUrl: '../dialog.scss'
})
export class GenerateTextDialogComponent {
  protected languagesWithoutUserNativeLanguage$ = this.globalService.nativeLanguage$.pipe(mergeMap(e => from(LanguagesList).pipe(filter(value => value != e), toArray())));

  wordsFormControl = new FormControl('');
  languageFormControl = new FormControl('', [Validators.required]);
  formatFormControl = new FormControl('', [Validators.required]);
  levelFormControl = new FormControl('', [Validators.required]);
  topicFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  filteredOptions$:Observable<IWord[]> = this.wordsFormControl.valueChanges.pipe(withLatestFrom(this.words), map((e) => {
      return e[1].filter((word) => !!this.languageFormControl.value && this.languageFormControl.value == word.language_word && !this.selectedWords.includes(word.word) && word.word.indexOf(e[0]!) != -1)
    }
  ));
  selectedWords:string[] = [];
  @ViewChild('wordInput') wordInput: ElementRef<HTMLInputElement> | undefined;
  constructor(public dialogRef: MatDialogRef<GenerateTextDialogComponent>, @Inject(MAT_DIALOG_DATA) public words: Observable<IWord[]>, private globalService: GlobalService) {
  }

  remove(word: string) {
    const index = this.selectedWords.indexOf(word);

    if (index >= 0) {
      this.selectedWords.splice(index, 1);
    }
    this.wordsFormControl.setValue(this.wordsFormControl.value);
  }

  select(event: MatAutocompleteSelectedEvent) {
    this.selectedWords.push(event.option.viewValue);
    (this.wordInput as ElementRef<HTMLInputElement> ).nativeElement.value = '';
    this.wordsFormControl.setValue('');
  }

  showOptions() {
    this.wordsFormControl.setValue('');
  }

  protected readonly LanguagesList = LanguagesList;
  protected readonly FormatsList = FormatsList;
  protected readonly LevelsList = LevelsList;
}
