import {
  auditTime, debounceTime, filter, firstValueFrom, from, map, mergeMap, Observable, Subject, tap, throttleTime, toArray,
  withLatestFrom
} from 'rxjs';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { IWord } from '@core/types/response-from-server.type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@core/services/auth.service';
import { AccountInfoService } from '@core/services/account-info.service';
import { LanguagesList, FormatsList, LevelsList } from '@core/utils/lists';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


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
    TranslateModule,
    NgIf
  ],
  templateUrl: './generate-text-dialog.component.html',
  styleUrl: '../dialog.scss'
})
export class GenerateTextDialogComponent {
  wordsFormControl = new FormControl('');

  languageFormControl = new FormControl(
    '',
    [Validators.required])
  ;

  formatFormControl = new FormControl(
    '',
    [Validators.required]
  );

  levelFormControl = new FormControl(
    '',
    [Validators.required]
  );

  topicFormControl = new FormControl(
    '',
    [Validators.required]
  );

  nameFormControl = new FormControl(
    '',
    [Validators.required]
  );

  selectFormControl = new FormControl(
    [],
    [Validators.required, Validators.minLength(5)]
  );

  readonly languagesWithoutUserNativeLanguage$ = this.accountInfoService.nativeLanguage$.pipe(mergeMap(e => from(LanguagesList).pipe(filter(value => value != e), toArray())));

  filteredOptions$:Observable<IWord[]> = this.wordsFormControl.valueChanges.pipe(
    withLatestFrom(this.words),
    map((e) => {
      return e[1].filter((word) =>  !!this.languageFormControl.value!.trim().toLowerCase() && this.languageFormControl.value!.trim().toLowerCase() === word.language_word!.trim().toLowerCase() && !this.selectedWords.includes(word.word.trim().toLowerCase()) && word.word.toLowerCase().indexOf(e[0]!.trim().toLowerCase()!) != -1)
    }
  ));

  selectedWords:string[] = [];

  selectWordsAdding$ = new Subject<string>();

  @ViewChild('wordInput') wordInput: ElementRef<HTMLInputElement> | undefined;
  constructor(public dialogRef: MatDialogRef<GenerateTextDialogComponent>, @Inject(MAT_DIALOG_DATA) public words: Observable<IWord[]>, private authService: AuthService, private accountInfoService: AccountInfoService) {
    this.languageFormControl.valueChanges.pipe(
      takeUntilDestroyed(),
      tap(() => {
        this.selectedWords = [];
      })
    ).subscribe()

    this.selectWordsAdding$.pipe(
      takeUntilDestroyed(),
      debounceTime(200),
      tap((word) => {
        if(!this.selectedWords.filter((e) => e.toLowerCase().trim() === word.toLowerCase().trim()).length)
          this.selectedWords.push(word);
      })
    ).subscribe();
  }

  remove(word: string) {
    const index = this.selectedWords.indexOf(word);

    if (index >= 0) {
      this.selectedWords.splice(index, 1);
    }
    this.wordsFormControl.setValue(this.wordsFormControl.value);
  }

  async add(event: MatChipInputEvent) {
    if (!!event.value) {
      this.selectWordsAdding$.next(event.value);
      (this.wordInput as ElementRef<HTMLInputElement> ).nativeElement.value = '';
      this.wordsFormControl.setValue('');
    }
  }

  select(event: MatAutocompleteSelectedEvent) {
    this.selectWordsAdding$.next(event.option.value);
    (this.wordInput as ElementRef<HTMLInputElement> ).nativeElement.value = '';
    this.wordsFormControl.setValue('');
  }

  showOptions() {
    this.wordsFormControl.setValue('');
  }

  readonly FormatsList = FormatsList;
  readonly LevelsList = LevelsList;
}
